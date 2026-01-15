import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import type { DatabaseType } from "../repositories/database.js";

export const DBAdapter = (db: D1Database) => {
    return new Kysely<DatabaseType>({
      dialect: new D1Dialect({ database: db }),
    });
}