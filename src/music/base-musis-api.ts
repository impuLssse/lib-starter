export abstract class BaseMusicApi<Track> {
  /**
   * Get track
   * @param trackId Track id on platform.
   * @returns OK returning Track
   */
  abstract getTrack(trackId: string | number): Promise<Track>;

  /**
   * Make request on download track.
   * @param track Receive found track to download
   * @returns OK returning string
   */
  abstract downloadTrack<DownloadOptions extends object>(
    track: Track,
    downloadOptions?: DownloadOptions
  ): Promise<string | Buffer | null>;

  /**
   * Create client for music api
   */
  abstract createClient(): Promise<void> | void;
}
