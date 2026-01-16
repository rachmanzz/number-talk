import { createContext, useCallback, useContext, useEffect, useState, type ReactElement, } from "react"
import LoginForm from "../extends/LoginForm"
import RegisterForm from "../extends/RegisterForm"
import { backendUrl } from "../../utils/backend"
import { responseSchema, userRespSchema } from "../../apis/response.schema"
import { toast } from "react-toastify"
import { useUserLogout } from "../../apis/user/mutation"

type props = {
    children: ReactElement
}

type LoginAct = "login" | "logout" | "none"

type AuthInfo = {
    act: LoginAct
    user?: { username: string, name: string }
}

const AuthContext = createContext<AuthInfo>({
    act: "none"
})
type LoginDispatch = {
    dispatch: (act: LoginAct) => void
}

const RegisterContext = createContext(() => { })

const LoginContext = createContext<LoginDispatch>({ dispatch: () => { } })

export const useLoginAction = () => useContext(LoginContext)
export const useShowRegister = () => useContext(RegisterContext)
export const useUserInfo = () => {
    const { user } = useContext(AuthContext)
    return user
}
export default function AuthLayout({ children }: props) {

    const [authState, setAuthState] = useState<AuthInfo>({
        act: "none"
    })
    const logout = useUserLogout()

    const [showRegister, setShowRegister] = useState(false)

    const loginAction = (act: LoginAct) => {
        if (act === "logout") {
            logout.mutate()
            setAuthState({ act: "none" })
            return
        }
        setAuthState(prev => ({ ...prev, act }))
    }

    const getUser = useCallback(async (signal?: AbortSignal) => {
        try {
            const raw = await fetch(backendUrl("/authorized/user/info"), { credentials: 'include', signal: signal })
            if (raw.status == 200) {
                const jsonData = await raw.json()
                const result = responseSchema.safeParse(jsonData)
                if (result.success) {
                    if (result.data.success) {
                        const dataBody = result.data.data
                        const zodData = userRespSchema.safeParse(dataBody)
                        if (zodData.success) {
                            setAuthState(prev => ({ ...prev, user: { name: zodData.data.name, username: zodData.data.username } }))
                            return
                        }

                        // invalid, error or backend schema user response was updated backend
                        toast("uknown error, please contact the administrator", { type: "error" })
                        return
                    }
                    // here sould be no error
                    toast("uknown error, please contact the administrator", { type: "error" })
                    return
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "AbortError") {
                    return
                }
            }
            console.error(error)
        }
    }, [])

    useEffect(() => {
        const signal = new AbortController()
        getUser(signal.signal)
        return () => {
            signal.abort()
        }
    }, [getUser])

    const loginFormOnClose = (loged:boolean = false) => {
        loginAction("none")
        if (loged) {
            getUser()
        }
    }

    return (
        <AuthContext.Provider value={authState}>
            <RegisterContext value={() => setShowRegister(true)}>
                <LoginContext.Provider value={{ dispatch: loginAction }}>

                    {children}
                </LoginContext.Provider>
            </RegisterContext>
            <LoginForm show={authState.act === "login"} close={loginFormOnClose} />
            <RegisterForm show={showRegister} close={() => setShowRegister(false)} />
        </AuthContext.Provider>
    )
}