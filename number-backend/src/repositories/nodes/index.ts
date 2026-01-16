import type { Kysely } from "kysely";
import type { DatabaseType } from "../database.js";
import type { NewNode, NodeTable } from "./schema/node.schema.js";


export const createNodeTree = async (db: Kysely<DatabaseType>, col: NewNode) => {
    return db.insertInto("node_trees").values(col).executeTakeFirstOrThrow()
}

export const getNodeParents = async (db: Kysely<DatabaseType>) => {
    return db.selectFrom("node_trees").selectAll().where("parent_id", "is", null).orderBy("created_at", "desc").limit(20).execute()
}

export const getChildNodes = async (db: Kysely<DatabaseType>, ids: string[]) => {

    return db.selectFrom("node_trees").selectAll().where("id", "in", ids).orderBy("created_at", "asc").limit(1000).execute()
}

export const getAllDescendantsD1 = async (
    db: D1Database,
    parentIds: string[]
) => {
    const safeParentIds = parentIds ?? []

    if (safeParentIds.length === 0) return []

    const placeholders = safeParentIds.map(() => '?').join(',')

    const sql = `
    WITH RECURSIVE descendants AS (
      SELECT * FROM node_trees WHERE id IN (${placeholders})
      UNION
      SELECT nt.*
      FROM node_trees nt
      INNER JOIN descendants d ON nt.parent_id = d.id
    )
    SELECT * FROM descendants ORDER BY created_at ASC
  `

    const stmt = db.prepare(sql).bind(...parentIds)
    const result = await stmt.all<NodeTable>()

    return result.results ?? []
}




export const getNodeByID = async (db: Kysely<DatabaseType>, id: string) => {
    return db.selectFrom("node_trees").selectAll().where("id", "==", id).executeTakeFirstOrThrow()
}