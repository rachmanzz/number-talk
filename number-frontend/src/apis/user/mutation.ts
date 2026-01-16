import { useMutation, useQuery } from "@tanstack/react-query"
import { backendUrl } from "../../utils/backend"
import { responseSchema } from "../response.schema"
import { toast } from "react-toastify"

type NewUserType = {name: string, username: string, password: string}
export const useRegisterUser = (close: ()=> void) => {
    return useMutation({
        mutationFn: async (data: NewUserType) => {
            return fetch(backendUrl("auth/user/register"), {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(r => r.json())
        },
        onSuccess(data) {
            const resp = responseSchema.safeParse(data)
            if (resp.success) {
                if (resp.data.success) {
                    toast(resp.data.message ?? "User Successfully Register")
                    close()
                } else {
                    toast(resp.data.message ?? "Fail register user", {type: "error"})
                }
             } else { 
                // schema invalid from the backend
                toast("uknown error, please contact the administrator", {type: "error"})
              }
        }
    })
}

type userLoginType = {
    username: string
    password: string
}
export const useLoginUser = (close:(loged: boolean) => void) => {
    return useMutation({
        mutationFn: async (data: userLoginType) => {
            return fetch(backendUrl("auth/user/login"), {
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
                if(resp.data.success) {
                    toast("Login success")
                    close(true)
                } else {
                    toast(resp.data.message ?? "Fail register user", {type: "error"})
                }
            } else {
                toast("uknown error, please contact the administrator", {type: "error"})
            }
        }
    })
}


export const  useUserInfo = () => {
    return useQuery({
        queryKey: ["userinfokey"],
        queryFn: async () => {
            return fetch(backendUrl("/authorized/user/info"), {credentials: 'include'}).then(r => r.json())
        },
    })
}

export const useUserLogout = () => {
    return useMutation({
        mutationFn: async () => {
            return fetch(backendUrl("auth/user/logout"), {
                method: "DELETE",
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
                    toast(resp.data.message ?? "User Successfully Logout")
                    close()
                } else {
                    toast(resp.data.message ?? "logout Failed", {type: "error"})
                }
             } else { 
                // schema invalid from the backend
                toast("uknown error, please contact the administrator", {type: "error"})
              }
        }
    })
}