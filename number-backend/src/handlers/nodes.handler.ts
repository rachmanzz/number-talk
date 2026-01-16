import z from "zod";
import { factory } from "../factory.js";
import { getUserName } from "../utils/username.js";
import { DBAdapter } from "../utils/db-adapter.js";
import { validator } from "../utils/validator.js";
import { createNodeTree, getAllDescendantsD1, getChildNodes, getNodeByID, getNodeParents } from "../repositories/nodes/index.js";
import { SendError, SendSuccess } from "../utils/response.js";
import { setOperation, type Operation } from "../utils/operation.js";
import buildNodes, { mergeParentsToTree, normalizeParentToNodeTable, toTree } from "../utils/node.js";

const insertNodeSchema = z.object({
  parent_id: z.string().optional(),
  operation: z.enum(['start', 'add', 'sub', 'mul', 'div']),
  val: z.string()
})

export const HandleCreateNode = factory.createHandlers(validator(insertNodeSchema),async (c) => {
    const username = await getUserName(c, c.env.SECRET_SIGN)
    const {parent_id, val, operation} = c.req.valid("json")
    const db = DBAdapter(c.env.DB)
    try {
        let leftValue = 0;
        let totalValue = 0;
        const rightValue = parseInt(val)
        if (parent_id) {
            const node = await getNodeByID(db, parent_id)
            leftValue = node.result_value;
            totalValue = setOperation(operation as Operation, leftValue, rightValue)
        } else {
            totalValue = rightValue;
        }
        const id = crypto.randomUUID()

        await createNodeTree(db, {user_username: username,parent_id, left_value: leftValue, right_value: rightValue, result_value: totalValue, id, operation: parent_id ? operation : "start"})

        return SendSuccess(c, {message: "OK", data: totalValue})
    } catch (error) {
        if (error instanceof Error) {
            if(/Division by zero/.test(error.message)) {
                return SendError(c, {message: "Cannot Division by 0"}, 400)
            }
            if (/Unsupported operation/.test(error.message)) {
                return SendError(c, {message: error.message}, 400)
            }
        }
        return SendError(c, {message: "unkown error, please contact the administrator"})
    }

})

export const HandleGetNodeTree = factory.createHandlers(async (c) => {
    try {
        const db = DBAdapter(c.env.DB)
        const parents = await getNodeParents(db)
        const ids = parents.map(it=>it.id)
        const nodes = await getAllDescendantsD1(c.env.DB, ids)

        const nodeAll = buildNodes(nodes)
        const treeNode = toTree(nodeAll)
        const normalizeParent = parents.map(it => normalizeParentToNodeTable(it))
        const merger = mergeParentsToTree(treeNode, normalizeParent)

        return SendSuccess(c, {message: "OK", data: merger})

    } catch (error) {
        return SendError(c, {message: "Unknown error"})
    }
})

