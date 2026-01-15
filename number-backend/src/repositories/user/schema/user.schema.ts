import type { Insertable, Generated, ColumnType, Selectable } from "kysely";

export interface UserTable {
    id: Generated<bigint>
    name: string
    username: string
    password: string
    created_at: ColumnType<Date, string | undefined, never>
} 

export type NewUser = Insertable<UserTable>;
export type UserType = Selectable<UserTable>;