import { cn } from "../../utils/cn";

export default function TextField({className, ...props}: React.InputHTMLAttributes<HTMLInputElement>) {

    return <input className={cn("p-2 rounded-sm border border-gray-100", className)} {...props} />
}