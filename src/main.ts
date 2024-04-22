import "tsconfig-paths";
import { Telegraf, session } from "telegraf";
import { config } from "dotenv";
import { store } from "@store";
config();

export const bot = new Telegraf<IContext>(process.env.BOT_TOKEN);
import { YandexMusicApi } from "@music/yandex";

export namespace MusicApi {
  export let Yandex: YandexMusicApi;
}

function bootstrap() {
  bot.use(session({ store: store() }));

  MusicApi.Yandex = new YandexMusicApi({
    baseUrl: "https://api.music.yandex.net:443",
    accessToken: process.env.YANDEX_ACCESS_TOKEN,
  });
  MusicApi.Yandex.createClient();

  bot.launch();
  console.log("bot started");
}
bootstrap();

/**
 * Импортируем обработчики
 */
import "@handlers/commands";
import "@handlers/listeners";
import { IContext } from "@libs/interfaces";

process.on("uncaughtException", (error: Error & { code }, origin) => {
  console.error(error);
  console.error(origin);
  process.exit(1);
});
