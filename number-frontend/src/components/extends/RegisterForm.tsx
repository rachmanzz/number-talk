import type { FormEvent } from "react"
import BackDrop from "../ui/backdrop"
import Button from "../ui/button"
import PasswordField from "../ui/PasswordField"
import ShowElement from "../ui/show"
import TextField from "../ui/TextField"
import { toast } from "react-toastify"
import { useRegisterUser } from "../../apis/user/mutation"


export default function RegisterForm({ show, close }: { show: boolean, close: () => void }) {

  const mutation = useRegisterUser(close)

  const registerAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    const name = form.get("name")
    const username = form.get("username")
    const password = form.get("password")
    if (name!.toString().length < 3) {
      toast("Name must be at least 3 characters long.", {type: "error"})
      return
    }
    if (username!.toString().length < 4) {
      toast("Username must be at least 3 characters long.", {type: "error"})
      return
    }
    if (password!.toString().length < 8) {
      toast("Password must be at least 8 characters long.", {type: "error"})
      return
    }

    mutation.mutate({name: name!.toString(), username: username!.toString(), password: password!.toString()})
  }
  return (
    <ShowElement show={show}>
      <BackDrop>
        <div className="flex flex-col p-4">
          <div className="flex justify-center"> REGISTER FORM </div>
          <form onSubmit={registerAction}>
            <div className="flex flex-col gap-3 mt-5 w-full px-10">
              <TextField placeholder="name" name="name" className="w-full" />
              <TextField placeholder="username" name="username" className="w-full" />
              <PasswordField placeholder="Password" name="password" className="w-full" />
              <div className="flex flex-row gap-2 justify-end">
                <Button type="submit">Register</Button> <Button type="button" onClick={close} className="bg-red-700">Cancel</Button>
              </div>
            </div>
          </form>
        </div>
      </BackDrop>
    </ShowElement>
  )
}