import { useMutation } from "@tanstack/react-query"
import { backendUrl } from "../../utils/backend"
import { responseSchema } from "../response.schema"
import { toast } from "react-toastify"

export type OperationType = 'start' | 'add' | 'sub' | 'mul' | 'div'
type numberPostType = {
    operation: OperationType
    val: string
    parent_id?: string
}


export const usePostNumber = (whenSuccess: ()=> void) => {
    return useMutation({
        mutationFn: async (data: numberPostType) => {
            return fetch(backendUrl("authorized/node/operation"), {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).then(r => r.json())
        },
        onSuccess(data) {
            const resp = responseSchema.safeParse(data)
            if (resp.success) {
                if (resp.data.success) {
                    toast("Login success")
                    whenSuccess()
                } else {
                    toast(resp.data.message ?? "Fail post a number", { type: "error" })
                }
            } else {
                toast("uknown error, please contact the administrator", { type: "error" })
            }
        },
    })
}