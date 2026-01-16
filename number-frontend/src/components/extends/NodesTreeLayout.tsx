import { createContext, useCallback, useContext, useEffect, useRef, useState, type Dispatch } from "react"
import { useGetTreeNodes, type NodeTable } from "../../apis/node/query"
import { useUserInfo } from "../providers/AuthLayout"
import { toast } from "react-toastify"
import AddIcon from "../icons/AddIcon"
import MinusIcon from "../icons/MinusIcon"
import MultiIcon from "../icons/MultiIcon"
import DivIcon from "../icons/DivIcon"
import { usePostNumber } from "../../apis/node/mutation"
import { useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"

const TimeAgo  = ({created_at}: {created_at: string|Date}) => {
    const [timeInfo, setTimeInfo] = useState("")

    useEffect(() => {
        setTimeInfo(formatDistanceToNow(new Date(created_at), { addSuffix: false }))

        return () => {
            setTimeInfo("")
        }
    }, [created_at])
    return <span className="text-gray-500">{timeInfo}</span>
}

const InputContext = createContext<string | null>(null)
const OpenInputContext = createContext<Dispatch<React.SetStateAction<string | null>>>(() => { })

const useInputID = () => useContext(InputContext)
const useSetInputID = () => useContext(OpenInputContext)

export const NodeItem = ({ data }: { data: NodeTable }) => {
    const user = useUserInfo()
    const inputID = useInputID()
    const setInputID = useSetInputID()
    const queryClient = useQueryClient()
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const postMutation = usePostNumber(() => {
        queryClient.invalidateQueries({
            queryKey: ["treenodeskey"]
        })
    })

    const [op, setOp] = useState<"add" | "div" | "mul" | "sub">("add")
    const [numb, setNumb] = useState("")

    const onInputNumberChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target.value

        if ((/^\d+$/.test(target)) || target === "") {
            setNumb(target)
        }
    }

    const onReplyClick = useCallback((id: string) => {
        if (!user) {
            toast("Please login first", { type: "warning" })
            return
        }

        setTimeout(() => {
            inputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
            inputRef.current?.focus()
        }, 500)
        setInputID(id)
    }, [user])

    const onSubmitNumber = () => {
        if (numb.trim() === "0" || numb.trim() === "") {
            toast("invalid number", { type: "warning" })
            return
        }

        postMutation.mutate({ parent_id: data.id, operation: op, val: numb })
        setNumb("")
    }

    return (
        <>
            <div className="flex flex-row border p-4 gap-3 border-gray-50">
                <div className="flex items-center">
                    <div className=" w-12 h-12 rounded-lg bg-gray-100" />
                </div>
                <div className="flex-1 flex flex-col px-4 gap-1.5">
                    <div className="flex gap-2 items-center">@{data.user_username}<TimeAgo created_at={data.created_at} /></div>
                    <div className="text-md">{data.result_value}</div>
                    {user && (
                        <div>
                            <button onClick={() => onReplyClick(data.id)} className="bg-indigo-800 text-white text-sm py-1 px-5 rounded">Reply</button>
                        </div>
                    )}
                </div>
            </div>
            {data.children && (
                <div className="ml-10 flex flex-col">
                    {data.children.map(it => (
                        <NodeItem data={it} key={it.id} />
                    ))}
                </div>
            )}

            {user && inputID === data.id && (
                <div className="flex w-full flex-row border-l border-b p-2 gap-2 border-gray-50">
                    <div className="flex items-center">
                        <div className=" w-16 h-16 rounded-lg bg-gray-100" />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                        <div className="relative flex w-full items-center">
                            <textarea ref={inputRef} value={numb} onChange={onInputNumberChange} placeholder="type your number here" className="w-full h-10 resize-none [&::-webkit-scrollbar]:hidden py-2 pl-2 pr-24 rounded-lg bg-gray-50"></textarea>
                            <div className="z-10 absolute flex right-2">
                                <button onClick={onSubmitNumber} className="bg-indigo-800 text-white text-sm py-1 px-5 rounded">send</button>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1 justify-end items-center">

                            <button onClick={() => setOp("add")} className={`p-1 cursor-pointer rounded-lg border border-gray-100 ${op === "add" ? "bg-blue-400" : ""}`}>
                                <AddIcon className={`w-3 ${op === "add" ? "text-white" : ""}`} />
                            </button>
                            <button onClick={() => setOp("sub")} className={`p-1 cursor-pointer rounded-lg border border-gray-100 ${op === "sub" ? "bg-blue-400" : ""}`}>
                                <MinusIcon className={`w-3 ${op === "sub" ? "text-white" : ""}`} />
                            </button>
                            <button onClick={() => setOp("mul")} className={`p-1 cursor-pointer rounded-lg border border-gray-100 ${op === "mul" ? "bg-blue-400" : ""}`}>
                                <MultiIcon className={`w-3 ${op === "mul" ? "text-white" : ""}`} />
                            </button>
                            <button onClick={() => setOp("div")} className={`p-1 cursor-pointer rounded-lg border border-gray-100 ${op === "div" ? "bg-blue-400" : ""}`}>
                                <DivIcon className={`w-3 ${op === "div" ? "text-white" : ""}`} />
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default function NodesTreeLayout() {
    const { isPending, error, data } = useGetTreeNodes()
    const [openInput, setOpenInput] = useState<string | null>(null)
    const [numb, setNumb] = useState("")
    const queryClient = useQueryClient()
    const postMutation = usePostNumber(() => {
        queryClient.invalidateQueries({
            queryKey: ["treenodeskey"]
        })
    })

    const onInputNumberChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target.value

        if ((/^\d+$/.test(target)) || target === "") {
            setNumb(target)
        }
    }

    const onSubmitNumber = () => {
        if (numb.trim() === "0" || numb.trim() === "") {
            toast("invalid number", { type: "warning" })
            return
        }

        postMutation.mutate({ operation: "start", val: numb })
        setNumb("")
    }

    if (error) return <div>Load data error..</div>
    if (isPending) return <div>Data on load...</div>

    return (
        <InputContext.Provider value={openInput}>
            <OpenInputContext.Provider value={setOpenInput}>
                <div className="flex flex-col mt-5 w-full">
                    <div className="flex w-full flex-row border-l border p-2 gap-2 border-gray-50">
                        <div className="flex items-center">
                            <div className=" w-16 h-16 rounded-lg bg-gray-100" />
                        </div>
                        <div className="flex flex-col gap-1.5 w-full">
                            <div className="relative flex w-full items-center">
                                <textarea value={numb} onChange={onInputNumberChange} placeholder="type your number here" className="w-full h-10 resize-none [&::-webkit-scrollbar]:hidden py-2 pl-2 pr-24 rounded-lg bg-gray-50"></textarea>
                                <div className="z-10 absolute flex right-2">
                                    <button onClick={onSubmitNumber} className="bg-indigo-800 text-white text-sm py-1 px-5 rounded">send</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {data.map(it => (
                        <NodeItem data={it} key={it.id} />
                    ))}
                </div>
            </OpenInputContext.Provider>
        </InputContext.Provider>
    )
}


