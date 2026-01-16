import { useState, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const EyeButtonWrapper = ({icon, ...props}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {icon: ReactElement}) => (
    <button className=" cursor-pointer absolute right-2 top-2" {...props}>{icon}</button>
)

export default function PasswordField({className, ...props}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
    const [type, setType] = useState<"password"|"text">("password")

    return (
        <div className="relative m-0 p-0">
            <input className={cn("py-2 pl-2 pr-10 rounded-sm border border-gray-100", className)} type={type} {...props} />
            {type === "password" && (<EyeButtonWrapper onClick={()=> setType("text")} icon={<EyeClosedIcon className="w-6 text-gray-300" />} />)}
            {type === "text" && (<EyeButtonWrapper onClick={()=> setType("password")} icon={<EyeIcon className="w-6 text-gray-300" />} />)}
        </div>
    )
}