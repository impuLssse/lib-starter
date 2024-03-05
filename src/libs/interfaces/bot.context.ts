import { Telegraf } from "telegraf";
import { IContext } from "./context";

export type IBotContext = Telegraf<IContext> & {};
