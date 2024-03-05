import { MySQL } from "@telegraf/session/mysql";
import { MysqlDialect } from "kysely";

export const store = () => {
  return MySQL<MysqlDialect>({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    port: Number(process.env.DATABASE_PORT),
  });
};
