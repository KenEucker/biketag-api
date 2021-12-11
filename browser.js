function biketagExample(options = {}) {
    let num_pages = 0;
    let current_page = 1;
    let previous_page = current_page;
    const rows_per_page = 3;
    const sanityBaseCDNUrl = `https://cdn.sanity.io/images/${options.sanity?.projectId ?? 'x37ikhvs'}/${options.sanity?.dataset ?? 'production'}/`

    /// Setup
    const getBikeTagApi = (opts, reinitialize = false) => {
        if (!window.biketagApi) {
            window.biketagApi = new biketag(opts)
        } else {
            console.log('setting new BikeTag config', {
                config: window.biketagApi.config(opts, false, reinitialize)
            })
        }

        return window.biketagApi
    }

    /// Change Game Selector Event
    const changeGame = async (elem) => {
        if (elem.selectedIndex > -1) {
            load({
                ...options,
                game: elem[elem.selectedIndex].value
            })
        }
    }

    /// Load BikeTag Game Data into UI
    const load = async (opts) => {
        const loaderEl = document.getElementById('loaderContainer')
        loaderEl.classList.add('loading')

        opts.game = opts.game ? opts.game : 'test'
        let biketagAPI = getBikeTagApi(opts, true)
        const game = await biketagAPI.game(opts.game, {source: 'sanity'})
        const pagesEl = document.getElementById('pageContent')
        const logoEl = document.getElementById('logo')
        const currentImageEl = document.getElementById('currentImage')

        pagesEl.innerHTML = ""
        num_pages = 0
        current_page = previous_page = 1
        currentImageEl.classList.add('hidden')

        const createImage = (url) => {
            const imgEl = document.createElement('img')
            const ext = /[^.]+$/.exec(url)
            if (['.jpg', '.jpeg', '.png', '.bmp'].indexOf(ext) !== -1) {
                url = url.replace(ext, `l${ext}`)
            } else if (ext.indexOf('.com/') === 0 && url.indexOf('//imgur.com/')) {
                url = `${url.replace('//imgur.com', '//i.imgur.com')}l.jpg`
            }

            imgEl.dataset.src = url
            imgEl.class = 'lazyload'
            imgEl.style = "width:100%;max-width:35vw"

            return imgEl
        }

        const createPage = (num = 1, rows = 4) => {
            const pageEl = document.createElement('div')

            pageEl.id = `page-${num}`
            pageEl.class = 'row'

            if (num > 1) {
                pageEl.style.display = "none";
                pageEl.style.visibility = "hidden";
            }

            for (let i = 1; i <= rows; i++) {
                const columnEl = document.createElement('div')

                columnEl.class = 'column'
                columnEl.id = `c${i}`
                pageEl.append(columnEl)
            }

            return pageEl
        }

        if (game) {
            console.info("\x1b[44mDisplaying Game\x1b[0m", game)

            const gameTextEl = document.getElementById("game")
            gameTextEl.innerText = game.name

            currentImageEl.querySelector('img').src = `https://${game.slug}.biketag.org/current`
            currentImageEl.classList.remove('hidden')
            logoEl.src = getLogoImageUrl(game)

            biketagAPI = getBikeTagApi({
                ...opts,
                imgur: {
                    hash: game.mainhash,
                },
                reddit: {
                    subreddit: game.subreddit,
                },
            }, true)
            const config = biketagAPI.config()

            const albumTagsData = await biketagAPI.tags(undefined, config.imgur.hash ? {
                source: 'imgur'
            } : {
                source: 'reddit',
                hash: 'n0'
            })
            const biketags = albumTagsData ?? []
            window.biketags = biketags

            console.info(
                `BikeTag Client Configured -> ${biketags.length ? 'BikeTags Retrieved' : `No BikeTags For Game: ${game.name}`}`, {
                    game: game,
                    biketags,
                })

            if (biketags.length) {
                const imagesToLoad = []
                let pageContentEl = null
                let columns = []
                for (let i = 0, j = 0, k = 0; i < biketags.length; ++i) {
                    const foundImageUrl = biketags[i].foundImageUrl
                    const mysteryImgUrl = biketags[i].mysteryImageUrl

                    if (!(mysteryImgUrl || foundImageUrl)) {
                        return
                    }

                    if (k === 0) {
                        /// Create new page
                        k++
                        pageContentEl = createPage(++num_pages)

                        columns = [
                            pageContentEl.querySelector('#c1'),
                            pageContentEl.querySelector('#c2'),
                            pageContentEl.querySelector('#c3'),
                            pageContentEl.querySelector('#c4'),
                        ]
                    }

                    if (foundImageUrl) {
                        const foundImage = createImage(foundImageUrl)
                        imagesToLoad.push(foundImage)
                        columns[j++].appendChild(foundImage)
                    }

                    if (j > 3) {
                        j = 0
                        k++
                    }

                    if (mysteryImgUrl) {
                        const mysteryImage = createImage(mysteryImgUrl)
                        imagesToLoad.push(mysteryImage)
                        columns[j++].appendChild(mysteryImage)
                    }

                    if (j > 3) {
                        j = 0
                        k++
                    }

                    if (k > rows_per_page) {
                        pagesEl.appendChild(pageContentEl)
                        pageContentEl = null
                        k = 0
                    }
                }

                if (pageContentEl) {
                    pagesEl.appendChild(pageContentEl)
                }

                lazyload(imagesToLoad)
                changePage(1)
            }
            loaderEl.classList.remove('loading')
        }
    }

    /// Populate the Change Game Selector from all available games
    const setAllGames = async (opts) => {
        const biketagAPI = getBikeTagApi(opts, true)
        const allGames = await biketagAPI.game(undefined, {source: 'sanity'})

        if (allGames?.length) {
              console.info("\x1b[44mGame Data Retrieved\x1b[0m", { allGames })

            const gameChangerEl = document.getElementById('gameChanger')
            const gameDirectoryEl = document.getElementById('gameDirectory')
            for (let game of allGames) {
                const gameSelectEl = document.createElement('option')
                const gameIconEl = document.createElement('a')
                const gameIconImageEl = document.createElement('img')
                const gameIconTextEl = document.createElement('span')
                gameIconEl.className = 'card'
                gameIconEl.href = `https://${game.slug}.biketag.org`
                gameIconImageEl.src = getLogoImageUrl(game)
                gameIconTextEl.innerText = game.name
                if (game.logo) {
                    gameIconTextEl.classList.add('hidden')
                }
                gameIconEl.append(gameIconImageEl)
                gameIconEl.append(gameIconTextEl)
                gameDirectoryEl.append(gameIconEl)

                gameSelectEl.text = game.name
                gameSelectEl.value = game.slug
                gameChangerEl.appendChild(gameSelectEl)
            }
        } else {
            console.info("\033[41mGame Data Could Not Be Retrieved\x1b[0m", allGames)
            if (!/0.0.0.0/.test(window.location.host)) {
                const portNumberIndex = window.location.host.indexOf(':')
                const zeeroZeroZeroZeroUrl = `http://0.0.0.0${portNumberIndex !== -1 ? window.location.host.substring(portNumberIndex) : ''}`
                const retyMessate = `Request is not being made from <a href="${zeeroZeroZeroZeroUrl}">${zeeroZeroZeroZeroUrl}</a>.<br>If you are running this on your local machine, (localhost), try 0.0.0.0 instead.`
                const currentImageEl = document.getElementById('currentImage')
                const currentImageHeadingEl = currentImageEl.querySelector('h3')

                currentImageHeadingEl.innerHTML = retyMessate
                currentImageEl.classList.remove('hidden')
    
                console.log(retyMessate)
            }
        }
    }

    /// Helpers
    const getLogoImageUrl = (game = {}) => game.logo ?
            `${sanityBaseCDNUrl}${game.logo.replace('image-', '').replace('-png', '.png').replace('-jpg','.jpg')}`
            : `${sanityBaseCDNUrl}dd6d8069fdfc6a4b7f9670977f0959301587534f-1200x600.png`

    /// ... Pagination Methods ... ///
    const prevPage = () => {
        if (current_page > 1) {
            previous_page = current_page;
            current_page--;
            changePage(current_page);
        }
    }

    const nextPage = () => {
        if (current_page < numPages()) {
            previous_page = current_page;
            current_page++;
            changePage(current_page);
        }
    }

    const changePage = (page) => {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var pageContentEls = document.querySelectorAll("#pageContent > *");
        var page_span = document.getElementById("page");

        // Validate page
        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();

        console.log('changePage', {
            page,
            pageContentEls,
            current_page,
            previous_page
        })
        if (pageContentEls.length) {
            if (previous_page < pageContentEls.length) {
                pageContentEls[previous_page - 1].style.display = "none";
                pageContentEls[previous_page - 1].style.visibility = "hidden";
            }

            pageContentEls[current_page - 1].style.display = "flex";
            pageContentEls[current_page - 1].style.visibility = "visible";
        }
        page_span.innerHTML = page + "/" + numPages();

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
            btn_next.style.visibility = "visible";
        }
    }

    const numPages = () => {
        return Math.ceil(num_pages / rows_per_page);
    }

    /// ... BOOTSTRAP ... ///
    setAllGames(options)

    /// ... LOAD .. ///
    window.onload = function () {
        changePage(1);
    };

    window.changePage = changePage
    window.changeGame = changeGame
    window.nextPage = nextPage
    window.prevPage = prevPage
}