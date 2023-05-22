const {
    BikeTagClient
} = require('../../biketag.node.js')
require('dotenv').config()

const gamePayload = {
    game: 'portland',
    slug: 'portland',
    host: 'http://portland.localhost:55306',
    concise: true,
    source: 'sanity'
}

const tag1Payload = {
    imgur: {
        hash: 'Y9PKtpI'
    },
    game: 'portland',
    tagnumbers: [1],
    tagnumber: 1,
    host: 'http://portland.localhost:55306',
    concise: true,
    slug: 'portland-tag-1',
    source: 'imgur',
    hash: 'Y9PKtpI'
}

const tenTagsPayload = {
    imgur: {
        hash: 'Y9PKtpI'
    },
    game: 'portland',
    slug: 'current',
    host: 'http://portland.localhost:55306',
    concise: true,
    limit: 10,
    source: 'imgur',
    hash: 'Y9PKtpI'
}
const currentTagPayload = {
    imgur: {
        hash: 'Y9PKtpI'
    },
    game: 'portland',
    slug: 'current',
    host: 'http://portland.localhost:55306',
    concise: true,
    source: 'imgur',
    hash: 'Y9PKtpI'
}
const playersPayload = {
    imgur: {
        hash: 'Y9PKtpI'
    },
    game: 'portland',
    host: 'http://portland.localhost:55306',
    concise: true,
    limit: 10
}
const ambassadorsPayload = {
    imgur: {
        hash: 'Y9PKtpI'
    },
    game: 'portland',
    host: 'http://portland.localhost:55306',
    concise: true,
    limit: 10
}

const runIntegrationTests = async (client) => {
    const gamePayResponse = await client.getGame(gamePayload, {
        source: 'sanity'
    })
    const tag1PayResponse = await client.getTags(tag1Payload)
    const tenTagsPayResponse = await client.getTags(tenTagsPayload)
    const currentTagPayResponse = await client.getTags(currentTagPayload)
    const playersPayResponse = await client.getPlayers(playersPayload)
    const ambassadorsPayResponse = await client.getAmbassadors(ambassadorsPayload)

    console.log({
        gamePayResponse
    })
    console.log({
        tag1PayResponse
    })
    console.log({
        tenTagsPayResponse
    })
    console.log({
        currentTagPayResponse
    })
    console.log({
        playersPayResponse
    })
    console.log({
        ambassadorsPayResponse
    })
}

const biketag = new BikeTagClient({
    game: process.env.BIKETAG_GAME ? process.env.BIKETAG_GAME : 'test',
    host: process.env.BIKETAG_API_HOST ? process.env.BIKETAG_API_HOST : 'biketag.io',
    imgur: {
        hash: process.env.IMGUR_HASH,
        queuehash: process.env.IMGUR_QUEUEHASH,
        clientId: process.env.IMGUR_CLIENT_ID,
    },
    sanity: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
    }
})

runIntegrationTests(biketag)