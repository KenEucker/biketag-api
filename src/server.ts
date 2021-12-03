import { Body, Delete, Get, Path, Patch, Post, Route, Put } from 'tsoa'
import BikeTagClient, { BikeTagConfiguration } from '.'
import {
  queueTagImagePayload,
  getTagsPayload,
  uploadTagImagePayload,
  updateTagPayload,
  importTagPayload,
  deleteTagsPayload,
  getPlayersPayload,
  getAmbassadorsPayload,
  getSettingsPayload,
  getQueuePayload,
} from './common/payloads'
import { Game, Tag, Player, Ambassador, Setting } from './common/schema'
import {
  Credentials,
  BikeTagCredentials,
  BikeTagServerConfiguration,
  ApiOptions,
  BikeTagApiResponse,
  RequireAtLeastOne,
} from './common/types'

@Route('v2')
// @ts-ignore
export class BikeTagServer extends BikeTagClient {
  constructor(
    readonly configuration:
      | Credentials
      | BikeTagConfiguration
      | BikeTagServerConfiguration
  ) {
    super(configuration)
  }

  /// ****************************  Config Route Methods   ******************************** ///

  @Get('config')
  // @ts-ignore
  configRoute(config?: BikeTagServerConfiguration): BikeTagServerConfiguration {
    return {
      biketag: config?.biketag ?? this.biketagConfig,
      sanity: config?.sanity ?? this.sanityConfig,
      imgur: config?.imgur ?? this.imgurConfig,
      reddit: config?.reddit ?? this.redditConfig,
      twitter: config?.twitter ?? this.twitterConfig,
    } as BikeTagServerConfiguration
  }

  @Post('config')
  // @ts-ignore
  createConfigRoute(
    // @ts-ignore
    @Body() opts: any = {}
  ): ApiOptions {
    return this.getDefaultOptions(this.getInitialPayload(opts))
  }

  /// ****************************  Game Route Methods   ************************************ ///

  @Get('game/{game}')
  // @ts-ignore
  gameRoute(
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Game>> {
    return this.getGame(
      { game },
      opts as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Game>>
  }

  /// ****************************  Queue Route Methods   *********************************** ///

  @Post('queue/{game}')
  // @ts-ignore
  queueRoute(
    // @ts-ignore
    @Body() payload: getQueuePayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Tag[]>> {
    payload.game = game ?? payload.game
    return this.getQueue(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Tag[]>>
  }

  @Put('queue/{game}')
  // @ts-ignore
  queueImageRoute(
    // @ts-ignore
    @Body() payload: queueTagImagePayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Tag>> {
    payload.game = game ?? payload.game
    return this.queueTagImage(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Tag>>
  }

  @Patch('queue/{game}')
  // @ts-ignore
  submitRoute(
    // @ts-ignore
    @Body() payload: queueTagImagePayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Tag>> {
    payload.game = game ?? payload.game
    return this.submitQueuedTag(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Tag>>
  }

  /// ****************************  Tag Route Methods   ************************************ ///

  @Post('tags/{game}')
  // @ts-ignore
  tagsRoute(
    // @ts-ignore
    @Body() payload: getTagsPayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Tag[]>> {
    payload.game = game ?? payload.game
    return this.getTags(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Tag[]>>
  }

  @Put('tags/images/{game}')
  // @ts-ignore
  uploadImageRoute(
    // @ts-ignore
    @Body() payload: uploadTagImagePayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<boolean[]>> {
    payload.game = game ?? payload.game
    return this.uploadTagImage(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<boolean[]>>
  }

  @Patch('tags/{game}')
  // @ts-ignore
  updateRoute(
    // @ts-ignore
    @Body() payload: updateTagPayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<boolean>> {
    payload.game = game ?? payload.game
    return this.updateTag(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<boolean>>
  }

  @Put('tags/{game}')
  // @ts-ignore
  importRoute(
    // @ts-ignore
    @Body() payload: importTagPayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Tag[]>> {
    payload.game = game ?? payload.game
    return this.importTag(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Tag[]>>
  }

  @Delete('tags/{game}')
  // @ts-ignore
  deleteRoute(
    // @ts-ignore
    @Body() payload: deleteTagsPayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<boolean[]>> {
    payload.game = game ?? payload.game
    return this.deleteTags(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<boolean[]>>
  }

  /// ****************************  Player Route Methods   ********************************** ///

  @Post('players/{game}')
  // @ts-ignore
  playersRoute(
    // @ts-ignore
    @Body() payload: getPlayersPayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Player[]>> {
    payload.game = game ?? payload.game
    return this.getPlayers(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Player[]>>
  }

  /// ****************************  Ambassador Route Methods   ****************************** ///

  @Post('ambassadors/{game}')
  // @ts-ignore
  ambassadorsRoute(
    // @ts-ignore
    @Body() payload: getAmbassadorsPayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Ambassador[]>> {
    payload.game = game ?? payload.game
    return this.getAmbassadors(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Ambassador[]>>
  }

  /// ****************************  Setting Route Methods   ********************************* ///

  @Post('settings/{game}')
  // @ts-ignore
  settingsRoute(
    // @ts-ignore
    @Body() payload: getSettingsPayload,
    // @ts-ignore
    @Path('game') game?: string,
    opts?: Credentials
  ): Promise<BikeTagApiResponse<Setting[]>> {
    payload.game = game ?? payload.game
    return this.getSettings(
      payload,
      opts as unknown as RequireAtLeastOne<Credentials>
    ) as Promise<BikeTagApiResponse<Setting[]>>
  }
}

export type { BikeTagCredentials, BikeTagServerConfiguration }
