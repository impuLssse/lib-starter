import { IContext } from "@libs/interfaces";
import { waterMark } from "@libs/utils";
import { bot } from "@main";
import { Input } from "telegraf";
import * as YoutubeApi from 'ytdl-core'

bot.hears(/youtu.be/, async (ctx: IContext) => {
  const videoLink = ctx.message.text

  const videoLinkIsCorrect = YoutubeApi.validateURL(ctx.message.text)
  if (!videoLinkIsCorrect) {
    return 'Incorrect video link or videoId'
  }
  
  const foundVideo = await YoutubeApi.getInfo(videoLink)
  if (!foundVideo) {
    return "Youtube video not found";
  }

  const choosedMp3Format = foundVideo.formats.find(format => format.container == 'mp4')
  const audioThumbnail = foundVideo.videoDetails.thumbnails[0]

  try {
    await ctx.telegram.sendAudio(
      ctx.chat.id,
      {
        url: choosedMp3Format.url,
        filename: foundVideo.videoDetails.title,
      },
      {
        thumbnail: Input.fromURLStream(audioThumbnail.url),
        parse_mode: "HTML",
        caption: waterMark(ctx),
      }
    );
  } catch (e) {
    console.error(e);
  }
});
