import { bot } from "@main";

bot.start(async (ctx) => {
  await ctx.sendMessage(
    "Привет, Это бот для скачивания треков. Пока поддерживается только яндекс музыка. Можешь отправить мне <b>trackId</b>, либо ссылку на трек",
    {
      parse_mode: "HTML",
    }
  );

  console.log(`Sended start message to ${ctx.from.id}:${ctx.from?.username}`);
});
