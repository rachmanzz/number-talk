import type { NodeTable } from "./nodes/schema/node.schema.js"
import type { UserTable } from "./user/schema/user.schema.js"

export type DatabaseType = {
    users: UserTable,
    node_trees: NodeTable
}
