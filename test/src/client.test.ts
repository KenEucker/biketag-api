import { testPath, packagePath } from './config'
import { describe, test, expect } from 'vitest'
import * as path from 'path'

describe(`Built Module`, () => {
  test(`Resolves proper node build`, () => {
    expect(require.resolve(packagePath)).toBe(path.join(testPath, 'index.js'))
  })

  test(`Module exports BikeTagClient as default and named export`, () => {
    const { default: defaultExport, BikeTagClient: namedExport } = require(
      packagePath
    )
    expect(namedExport).toBe(defaultExport)
  })

  test(`Import from CommonJS gets API Response`, async () => {
    const BikeTagClient = require(packagePath).default
    const client = new BikeTagClient({ game: 'test', cached: false })
    // Exercise the built CommonJS entrypoint without depending on a live
    // external API, whose response time can exceed CI's test timeout.
    const response = { status: 200, statusText: 'OK', data: [{ slug: 'test' }] }
    client.request = async () => response
    client.cachedRequest = async () => response

    const result = await client.getGame({ game: 'test' })

    expect(result.status).toBe(200)
    expect(result.success).toBe(true)
    expect(result.data.slug).toBe('test')
  })

  // test(`Import from ESM gets API Response`, async () => {
  //   const esmProjectPath = path.join(assetsPath, 'esm')

  //   const httpStatus = await execSync(
  //     `node --experimental-modules ${esmProjectPath}`,
  //     {
  //       cwd: esmProjectPath,
  //     }
  //   )

  //   expect(httpStatus.toString()).toMatch(/^\d+($|\r?\n)/)
  // })
})

describe(`Module Interfaces directs calls to getter methods correctly`, () => {
  test.todo(
    'tags interface calls getTag [one] when passed a payload matching getTagPayload'
  )
  test.todo(
    'tags interface calls getTags [many] when passed a payload matching getTagsPayload'
  )

  test.todo(
    'players interface calls getPlayer [one] when passed a payload matching getPlayerPayload'
  )
  test.todo(
    'players interface calls getPlayers [many] when passed a payload matching getPlayersPayload'
  )

  test.todo(
    'ambassadors interface calls getAmbassador [one] when passed a payload matching getAmbassadorPayload'
  )
  test.todo(
    'ambassadors interface calls getAmbassadors [many] when passed a payload matching getAmbassadorsPayload'
  )

  test.todo(
    'settings interface calls getSetting [one] when passed a payload matching getSettingPayload'
  )
  test.todo(
    'settings interface calls getSettings [many] when passed a payload matching getSettingsPayload'
  )
})
