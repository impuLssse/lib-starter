import { findYandexTrackIdInMessage } from "@libs/utils";
import { MusicApi, bot } from "@main";

bot.hears(/music.yandex.com/, async (ctx) => {
  const slicedTrackId = findYandexTrackIdInMessage(ctx.message.text);
  console.log(`slicedTrackId`, slicedTrackId);

  const foundTrack = await MusicApi.Yandex.getTrack(slicedTrackId);
  if (!foundTrack) {
    return "Track not found";
  }
  const downloadedTrack = await MusicApi.Yandex.downloadTrack(foundTrack);

  console.log(`foundTrack`, foundTrack);
  console.log(`downloadedTrack`, downloadedTrack);

  try {
    await ctx.telegram.sendAudio(
      ctx.chat.id,
      {
        url: downloadedTrack,
        filename: foundTrack.title,
      },
      {
        parse_mode: "HTML",
        caption: `trackId: <code>${slicedTrackId}</code>`,
      }
    );
  } catch (e) {
    console.error(e);
  }
});
