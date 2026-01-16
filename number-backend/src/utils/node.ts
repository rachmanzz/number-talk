import type { NodeTable } from "../repositories/nodes/schema/node.schema.js"

export default function buildNodes(allNodes: NodeTable[]) {
  const nodeMap = new Map<string, NodeTable>()

  // 1. build map
  for (const node of allNodes) {
    nodeMap.set(node.id, node)
  }

  const paths: NodeTable[][] = []

  // 2. build path untuk tiap node
  for (const node of allNodes) {
    const path: NodeTable[] = []
    let current: NodeTable | undefined = node

    while (current) {
      path.unshift(current)

      if (!current.parent_id) break

      current = nodeMap.get(current.parent_id)
    }

    paths.push(path)
  }

  return paths
}

export type TreeNode = NodeTable & {
  children: TreeNode[]
}


export function toTree(paths: NodeTable[][]): TreeNode[] {
  const nodeMap = new Map<string, TreeNode>()
  const roots: TreeNode[] = []

  for (const path of paths) {
    for (let i = 0; i < path.length; i++) {
      const node = path[i]

      // create node once
      if (!nodeMap.has(node.id)) {
        nodeMap.set(node.id, {
          ...node,
          children: [],
        })
      }

      const current = nodeMap.get(node.id)!

      // root
      if (i === 0) {
        if (!roots.some(r => r.id === current.id)) {
          roots.push(current)
        }
        continue
      }

      // parent -> child
      const parentNode = nodeMap.get(path[i - 1].id)!
      if (!parentNode.children.some(c => c.id === current.id)) {
        parentNode.children.push(current)
      }
    }
  }

  return roots
}

export function mergeParentsToTree(
  treeNodes: TreeNode[],
  parents: NodeTable[]
): TreeNode[] {
  const nodeMap = new Map<string, TreeNode>()

  // flatten tree ke map (BFS, no recursion)
  const queue: TreeNode[] = [...treeNodes]
  while (queue.length) {
    const node = queue.shift()!
    nodeMap.set(node.id, node)
    if (node.children.length) {
      queue.push(...node.children)
    }
  }

  // merge parents
  for (const parent of parents) {
    if (!nodeMap.has(parent.id)) {
      treeNodes.push({
        ...parent,
        children: [],
      })
    }
  }

  return treeNodes
}


type ParentNode = {
  id: string
  parent_id?: string
  user_username: string
  operation: string
  left_value: number
  right_value: number
  result_value: number
  created_at: Date
}

export function normalizeParentToNodeTable(
  parent: ParentNode
): NodeTable {
  return {
    id: parent.id,
    parent_id: parent.parent_id,
    user_username: parent.user_username,
    operation: parent.operation,
    left_value: parent.left_value,
    right_value: parent.right_value,
    result_value: parent.result_value,
    created_at: parent.created_at as any,
  }
}

