import { SessionData } from "@libs/interfaces";
import { MySQL } from "@telegraf/session/mysql";

export const store = () => {
  return MySQL<SessionData>({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    port: Number(process.env.DATABASE_PORT),
  });
};
