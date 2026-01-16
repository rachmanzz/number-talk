import { cn } from "../../utils/cn";

export default function Button ({className, children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement> & {children: React.ReactNode}) {


    return <button className={cn("py-1 px-5 cursor-pointer bg-blue-900 text-white rounded", className)} {...props}>{children}</button>
}