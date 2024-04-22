import { IContext } from "@libs/interfaces";
import { findYandexTrackIdInMessage, waterMark } from "@libs/utils";
import { MusicApi, bot } from "@main";

bot.hears(/music.yandex.com/, async (ctx: IContext) => {
  const slicedTrackId = findYandexTrackIdInMessage(ctx.message.text);
  
  const foundTrack = await MusicApi.Yandex.getTrack(slicedTrackId);
  if (!foundTrack) {
    return "Track not found";
  }
  const downloadedTrack = await MusicApi.Yandex.downloadTrack(foundTrack);

  try {
    await ctx.telegram.sendAudio(
      ctx.chat.id,
      {
        url: downloadedTrack,
        filename: foundTrack.title,
      },
      {
        parse_mode: "HTML",
        caption: waterMark(ctx)
      }
    );
  } catch (e) {
    console.error(e);
  }
});
