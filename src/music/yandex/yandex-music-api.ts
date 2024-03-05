import { BaseMusicApi } from "@music/base-musis-api";
import { YandexMusicClient, Track as YandexTrack } from "yandex-music-client";
import { getTrackUrl } from "yandex-music-client/trackUrl";

type YandexMusicApiOptions = {
  baseUrl: string;
  accessToken: string;
};

export class YandexMusicApi extends BaseMusicApi<YandexTrack> {
  private client: YandexMusicClient;

  constructor(private clientOptions: YandexMusicApiOptions) {
    super();

    if (!clientOptions.accessToken || !clientOptions.baseUrl) {
      throw new Error("Yandex client received one of undefined option");
    }
  }

  async createClient() {
    this.client = new YandexMusicClient({
      BASE: this.clientOptions.baseUrl,
      HEADERS: {
        Authorization: `OAuth ${this.clientOptions.accessToken}`,
        "Accept-Language": "ru",
      },
    });
  }

  async getTrack(trackId: string): Promise<YandexTrack> {
    try {
      const foundTrackRaw = await this.client.tracks.getTracks({
        "track-ids": [trackId],
      });
      const foundTrack = foundTrackRaw.result.pop();
      if (!foundTrack) {
        return null;
      }

      return foundTrack;
    } catch (e) {
      console.log(e);
    }
  }

  async downloadTrack(track: YandexTrack): Promise<string> {
    const downloadLink = await getTrackUrl(this.client, track.id);
    return downloadLink;
  }
}
