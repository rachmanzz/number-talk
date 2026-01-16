import type { FormEvent } from "react"
import { useLoginUser } from "../../apis/user/mutation"
import BackDrop from "../ui/backdrop"
import Button from "../ui/button"
import ShowElement from "../ui/show"
import TextField from "../ui/TextField"
import { toast } from "react-toastify"
import PasswordField from "../ui/PasswordField"

export default function LoginForm({show, close}: {show: boolean, close: (loged:boolean)=> void}) {

    const mutation = useLoginUser(close)
    
      const loginAction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const username = form.get("username")
        const password = form.get("password")
        if (username!.toString().length < 4) {
          toast("Username must be at least 3 characters long.", {type: "error"})
          return
        }
        if (password!.toString().length < 8) {
          toast("Password must be at least 8 characters long.", {type: "error"})
          return
        }
    
        mutation.mutate({ username: username!.toString(), password: password!.toString()})
      }
    return (
        <ShowElement show={show}>
        <BackDrop>
          <div className="flex flex-col p-4">
            <div className="flex justify-center"> LOGIN FORM </div>
            <form onSubmit={loginAction}>
            <div className="flex flex-col gap-3 mt-5 w-full px-10">
              <TextField placeholder="username" name="username" className="w-full" />
              <PasswordField placeholder="Password" name="password" className="w-full" />

              <div className="flex flex-row gap-2 justify-end">
                <Button type="submit">Login</Button> <Button type="button" onClick={()=> close(false)} className="bg-red-700">Cancel</Button>
              </div>
            </div>
            </form>
          </div>
        </BackDrop>
      </ShowElement>
    )
}