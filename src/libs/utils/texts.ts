import { IContext } from "@libs/interfaces";

export const waterMark = (ctx: IContext) =>
    `Скачано с бота <a href=\"tg://user?id=${ctx.botInfo.id}\">${ctx.botInfo.username}</a>`

export const authorLink = (ctx: IContext) => '\nАвтор: <a href=\"tg://user?id=915886906\">impuLssse911</a>'