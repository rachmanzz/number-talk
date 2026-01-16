import type { Kysely } from "kysely";
import type { DatabaseType } from "../database.js";
import type { NewUser } from "./schema/user.schema.js";

export const createUser = async (db: Kysely<DatabaseType>, col: NewUser) => {
    return db.insertInto("users").values(col).executeTakeFirstOrThrow()
}

export const getUserByUsername = async (db: Kysely<DatabaseType>, val: string) => {
    return db.selectFrom("users").selectAll().where("username", "==", val).executeTakeFirst()
}
