import type { Kysely } from "kysely";
import type { DatabaseType } from "../database.js";
import type { NewUser } from "./schema/user.schema.js";

export const createUser = async (db: Kysely<DatabaseType>, col: NewUser) => {
    return db.insertInto("users").values(col).execute()
}

