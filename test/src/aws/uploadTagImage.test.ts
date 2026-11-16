import { CopyObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { describe, expect, test, vi } from 'vitest'
import { uploadTagImage } from '../../../src/aws/uploadTagImage'
import { getAwsBucketName, getBikeTagImageKey, getTagMetadata, getTagPrefix } from '../../../src/aws/helpers'

describe('aws uploadTagImage', () => {
  test('normalizes mixed-case game names for S3 buckets and image prefixes', async () => {
    expect(getTagPrefix('queue', 'Portland', 1393)).toBe('queue/portland-tag-1393')
    expect(await getBikeTagImageKey('found', 'Rider', 1393, 'Portland', 'image/jpeg', 'queue')).toMatch(/^queue\\/portland-tag-1393--found--[a-f0-9]{6}\\.jpg$/)

    expect(getAwsBucketName('Portland')).toBe('portland-biketag')
    expect(getAwsBucketName('PORTLAND')).toBe('portland-biketag')
  })

  test('keys complete queued found images at the current round', async () => {
    const send = vi.fn().mockResolvedValue({})
    const client = { send }

    const response = await uploadTagImage.call({}, client as any, {
      game: 'Portland',
      folder: 'queue',
      region: 'nyc3',
      tagnumber: 101,
      contentType: 'image/jpeg',
      foundPlayer: 'Finder',
      foundImage: new Blob(['found'], { type: 'image/jpeg' }),
      foundLocation: 'Park',
      mysteryPlayer: 'Finder',
      mysteryImage: new Blob(['mystery'], { type: 'image/jpeg' }),
      hint: 'Tree',
    })

    expect(response.success).toBe(true)
    expect(send).toHaveBeenCalledTimes(2)
    expect(send.mock.calls.every(([command]) => command.input.Bucket === 'portland-biketag')).toBe(true)

    const commands = send.mock.calls.map(([command]) => command)
    expect(
      commands.every((command) => command instanceof PutObjectCommand)
    ).toBe(true)

    const foundInput = commands[0].input
    const mysteryInput = commands[1].input

    expect(foundInput.Key).toMatch(
      /^queue\/[Pp]ortland-tag-100--found--[a-f0-9]{6}\.jpg$/
    )
    expect(mysteryInput.Key).toMatch(
      /^queue\/[Pp]ortland-tag-101--mystery--[a-f0-9]{6}\.jpg$/
    )
    expect(getTagMetadata(foundInput.Metadata.data)?.tagnumber).toBe(100)
    expect(getTagMetadata(mysteryInput.Metadata.data)?.tagnumber).toBe(101)
  })

  test('moves complete queued found images to the current round with matching metadata', async () => {
    const send = vi.fn().mockResolvedValue({})
    const client = { send }
    const bucketUrl = (key: string) =>
      `https://portland-biketag.nyc3.cdn.digitaloceanspaces.com/${key}`
    const wrongFoundKey = await getBikeTagImageKey(
      'found',
      'Finder',
      101,
      'portland',
      'image/jpeg',
      'queue'
    )
    const expectedFoundKey = await getBikeTagImageKey(
      'found',
      'Finder',
      100,
      'portland',
      'image/jpeg',
      'queue'
    )
    const mysteryKey = await getBikeTagImageKey(
      'mystery',
      'Finder',
      101,
      'portland',
      'image/jpeg',
      'queue'
    )

    const response = await uploadTagImage.call({}, client as any, {
      game: 'portland',
      folder: 'queue',
      region: 'nyc3',
      tagnumber: 101,
      foundPlayer: 'Finder',
      foundImageUrl: bucketUrl(wrongFoundKey),
      foundLocation: 'Park',
      mysteryPlayer: 'Finder',
      mysteryImageUrl: bucketUrl(mysteryKey),
      hint: 'Tree',
    })

    expect(response.success).toBe(true)
    expect(response.data.foundImageUrl).toBe(bucketUrl(expectedFoundKey))

    const replaceMetadataInputs = send.mock.calls
      .map(([command]) => command)
      .filter(
        (command) =>
          command instanceof CopyObjectCommand &&
          command.input.MetadataDirective === 'REPLACE'
      )
      .map((command) => command.input)
    const foundMetadataUpdate = replaceMetadataInputs.find(
      (input) => input.Key === expectedFoundKey
    )

    expect(foundMetadataUpdate).toBeDefined()
    expect(foundMetadataUpdate!.ContentType).toBe('image/jpeg')
    expect(getTagMetadata(foundMetadataUpdate!.Metadata.data)?.tagnumber).toBe(
      100
    )
  })
  test('shows a safe token authorization reason instead of a generic 403', async () => {
    vi.stubGlobal('window', {})
    try {
      const signedUrl = vi.fn().mockRejectedValue({
        message: 'Request failed with status code 403',
        response: { status: 403, data: 'Game does not match' },
      })
      const result = await uploadTagImage.call(
        { fetchSignedUrl: signedUrl, plainFetcher: vi.fn() },
        {} as any,
        {
          game: 'portland',
          tagnumber: 101,
          folder: 'queue',
          region: 'sfo3',
          playerId: 'player-id',
          foundPlayer: 'Rider',
          foundImage: new Blob(['image'], { type: 'image/jpeg' }),
          contentType: 'image/jpeg',
        } as any
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to upload found image: Game does not match')
      expect(signedUrl).toHaveBeenCalledOnce()
    } finally {
      vi.unstubAllGlobals()
    }
  })

  test('does not expose unexpected server response bodies', async () => {
    vi.stubGlobal('window', {})
    try {
      const signedUrl = vi.fn().mockRejectedValue({
        message: 'Request failed with status code 403',
        response: { status: 403, data: 'PRIVATE_SECRET' },
      })
      const result = await uploadTagImage.call(
        { fetchSignedUrl: signedUrl, plainFetcher: vi.fn() },
        {} as any,
        {
          game: 'portland',
          tagnumber: 101,
          folder: 'queue',
          region: 'sfo3',
          playerId: 'player-id',
          foundPlayer: 'Rider',
          foundImage: new Blob(['image'], { type: 'image/jpeg' }),
          contentType: 'image/jpeg',
        } as any
      )

      expect(result.success).toBe(false)
      expect(result.error).toBe('Failed to upload found image: Request failed with status code 403')
      expect(result.error).not.toContain('PRIVATE_SECRET')
    } finally {
      vi.unstubAllGlobals()
    }
  })

})
