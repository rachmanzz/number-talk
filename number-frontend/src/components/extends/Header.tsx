import { useLoginAction, useShowRegister, useUserInfo } from "../providers/AuthLayout";
import Button from "../ui/button";

export default function Header() {

    const user = useUserInfo()
    const {dispatch} = useLoginAction()
    const showRegister = useShowRegister()

    return (
        <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold">NUMBER TALK</h1>
            {!user && (
                <div className="flex flex-row gap-3">
                    <Button onClick={()=> dispatch("login")}>Login</Button>
                    <Button className="bg-orange-500" onClick={showRegister}>Register</Button>
                </div>
            )}

            {user && (
                <div className="flex flex-row items-center gap-3">
                    hy, @{user.username} <Button onClick={()=> dispatch("logout")} className="bg-red-800">Logout</Button>
                </div>
            )}
        </div>
    )
}