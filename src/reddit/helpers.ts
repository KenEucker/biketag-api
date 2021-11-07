import { tagDataReferenceFields, createTag } from '../common/data'
import { TagData } from '../common/types'
import {
  getCreditFromText,
  getFoundLocationFromText,
  getGPSLocationFromText,
  getHintFromText,
  getImageURLsFromText,
  getTagNumbersFromText,
} from '../common/getters'
import ImgurClient from 'imgur'
import { GalleryOptions } from 'imgur/lib/gallery'

export async function getBikeTagsFromRedditPosts(
  posts,
  imageClient: ImgurClient
) {
  let selftext = '',
    postBody,
    isSelfPost = true
  const postTexts = []
  const unreadableRedditPosts = []

  for (const p of posts) {
    const imgurBaseUrl = '://imgur.com'
    const galleryBaseUrl = `${imgurBaseUrl}/gallery/`
    const albumBaseUrl = `${imgurBaseUrl}/a/`

    if (p.selftext && p.selftext.length) {
      postBody = selftext = p.selftext
    } else if (p.media && p.media.oembed) {
      /// Might be a single tag?
      postBody = `${p.media.oembed.title} ${p.media.oembed.description}`
      selftext = p.media.oembed.url
      isSelfPost = false
    }

    const tagImageURLs = getImageURLsFromText(selftext, [])
    const tagNumbers = getTagNumbersFromText(postBody)
    let hint = getHintFromText(postBody, '')
    let foundAt = getFoundLocationFromText(postBody, '')
    let gps = getGPSLocationFromText(postBody, undefined)
    let credit = getCreditFromText(postBody, `u/${p.author.name}`)
    let timestamp = p.created_utc

    const directImageLinks = []
    let directImageLinksNumbers = tagNumbers
    for (let u = 0; u < tagImageURLs.length; u++) {
      const imageUrl = tagImageURLs[u]
      const galleryIndex = imageUrl.indexOf(galleryBaseUrl)
      const albumIndex = imageUrl.indexOf(albumBaseUrl)
      const imageUrlIsGallery = galleryIndex !== -1
      const imageUrlIsAlbum = albumIndex !== -1
      const imageIsMultipleIndex = imageUrlIsGallery ? galleryIndex : albumIndex
      const imageIsMultipleLength = imageUrlIsGallery
        ? galleryBaseUrl.length
        : albumBaseUrl.length

      /// If the one image is a gallery, we need to go get it's images and parse those
      if (imageUrlIsGallery || imageUrlIsAlbum) {
        const galleryID = imageUrl.substring(
          imageIsMultipleIndex + imageIsMultipleLength
        )
        const galleryInfoResponse = await imageClient.getAlbum(galleryID)

        if (galleryInfoResponse) {
          for (const image of galleryInfoResponse.data.images) {
            const imageText = `${image.title} ${image.description}`
            const newImageNumbers = getTagNumbersFromText(imageText)

            if ((newImageNumbers as number[]).length) {
              ;(directImageLinksNumbers as number[]).splice(u, 1)
              directImageLinksNumbers = (
                directImageLinksNumbers as number[]
              ).concat(newImageNumbers)
            }

            directImageLinks.push(image.link)

            /// TODO: might need a conversion to utc here
            timestamp = image.datetime || timestamp
            hint = hint || getHintFromText(imageText, '')
            foundAt = foundAt || getFoundLocationFromText(postBody, '')
            credit = credit || getCreditFromText(postBody, '')
            gps = gps || getGPSLocationFromText(postBody, undefined)
            credit = credit || image.account_url
          }
        }
      } else {
        directImageLinks.push(imageUrl)
      }
    }

    if (!(directImageLinksNumbers as number[]).length) {
      /// No tag numbers found?
      unreadableRedditPosts.push(p)
    } else {
      if (!foundAt) {
        foundAt = postBody
        const removeStringFromFoundAt = (s) => {
          foundAt = foundAt.replace(s, '')
        }
        const foundAtRemnantRegex = /\s*at\s*/gi

        ;(tagImageURLs as string[]).forEach(removeStringFromFoundAt)
        ;(tagNumbers as number[]).forEach((s) =>
          removeStringFromFoundAt(`#${s}`)
        )

        if (credit) {
          removeStringFromFoundAt(`(@|#|u/)?${credit}`)
        }
        if (gps) {
          removeStringFromFoundAt(
            new RegExp(
              `(@|#)?${gps.lat}.?${gps.long}|(@|#)?${gps.lat},${gps.long}`,
              'gi'
            )
          )
        }
        if (hint) {
          removeStringFromFoundAt(
            new RegExp(/(\()?(hint:?)?\s*(${hint})(\s?\))?/gi)
          )
        }

        removeStringFromFoundAt(/\[(?:bike)?\s*tag\s*\d*\]\(\s*\)/gi)
        removeStringFromFoundAt(/\[\s*\]\(http.*\)/gi)
        removeStringFromFoundAt(/\[(?!(?:bike)?\s*tag\s*).*\]\(.*\)/gi)
        removeStringFromFoundAt(/\[(?:bike)?\s*tag\s*\d*\s*-/gi)
        removeStringFromFoundAt(/\]\(\s*\)/gi)
        removeStringFromFoundAt(/\r?\n?/gi)
        removeStringFromFoundAt(/\\/gi)
        removeStringFromFoundAt(/\(\s*\)/gi)
        removeStringFromFoundAt(/&#.*;/gi)

        if (foundAt.endsWith('at') || foundAt.endsWith('at '))
          removeStringFromFoundAt(foundAtRemnantRegex)
        if (foundAt.startsWith('-') || foundAt.startsWith(' -'))
          removeStringFromFoundAt(/^\s*-/i)
        if (foundAt.startsWith(',') || foundAt.startsWith(' ,'))
          removeStringFromFoundAt(/^\s*,/i)

        foundAt = foundAt.trim()
      }

      postTexts.push({
        id: p.id,
        isSelfPost,
        selftext,
        postBody,
        timestamp,
        tagNumbers: directImageLinksNumbers,
        tagImageURLs: directImageLinks,
        credit,
        gps,
        foundAt,
        hint,
        author_flair: p.author_flair_text,
      })
    }
  }

  return postTexts
}

export async function getBikeTagInformationFromRedditData(
  redditPostData
): Promise<TagData> {
  if (!redditPostData.tagNumbers) {
    /// TODO: handle a link that is an image gallery and has only one tag number attached
    redditPostData.tagNumbers = [redditPostData.tagNumber]
  }

  const mysteryTagNumber = Math.max(...redditPostData.tagNumbers)
  const proofTagNumber = mysteryTagNumber - 1
  const previousMysteryTagNumber = proofTagNumber > 1 ? mysteryTagNumber - 1 : 1
  const currentTagURLIndex = redditPostData.tagNumbers.indexOf(mysteryTagNumber)
  const currentTagURL = redditPostData.tagImageURLs[currentTagURLIndex]
  const proofTagUrlIndex = redditPostData.tagNumbers.indexOf(
    previousMysteryTagNumber
  )
  const proofTagURL =
    proofTagUrlIndex !== -1
      ? redditPostData.tagImageURLs[proofTagUrlIndex]
      : null
  const gps = redditPostData.gps

  const tagData: Partial<TagData> = {
    foundLocation: redditPostData.foundAt,
    player: redditPostData.credit,
    hint: redditPostData.hint,
    gps,
    discussionUrl: `https://redd.it/${redditPostData.id}`,
    tagnumber: mysteryTagNumber,
    mysteryImageUrl: currentTagURL,
    foundImageUrl: proofTagURL,
  }

  return createTag(tagData)
}