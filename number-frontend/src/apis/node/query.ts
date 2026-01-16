import { useQuery } from "@tanstack/react-query"
import { backendUrl } from "../../utils/backend"
import { responseSchema } from "../response.schema"

export interface NodeTable {
    id: string
    parent_id?: string
    user_username: string
    operation: string
    left_value: number
    right_value: number
    result_value: number
    created_at: string
    children?: NodeTable[]
}

export const useGetTreeNodes = () => {
    return useQuery({
        queryKey: ["treenodeskey"],
        queryFn: async (): Promise<NodeTable[]> => {
            const resp = await fetch(backendUrl("/open/node-trees"))
            const rawJsonResult = await resp.json()
            const rawZodResult = responseSchema.safeParse(rawJsonResult)
            if (rawZodResult.success && Array.isArray(rawZodResult.data.data)) {
                rawZodResult.data.data.sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                )

                return rawZodResult.data.data
            }
            return []
        },
    })
}