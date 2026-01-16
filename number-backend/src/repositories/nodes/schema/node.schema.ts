import type { Insertable, ColumnType, Selectable } from "kysely";

export interface NodeTable {
    id: string
    parent_id?: string
    user_username: string
    operation: string
    left_value: number
    right_value: number
    result_value: number
    created_at: ColumnType<Date, string | undefined, never>
} 

export type NewNode = Insertable<NodeTable>;
export type NodeType = Selectable<NodeTable>;