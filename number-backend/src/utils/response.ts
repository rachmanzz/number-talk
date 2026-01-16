import type { Context } from "hono"
import { success } from "zod"

type SuccessResponse<Data extends unknown> = {
    message?: string,
    data?: Data
}

type ErrorResponse = {
    message: string
    error?: string | unknown
}

export const SendSuccess = <Data extends unknown>(c: Context, resp: SuccessResponse<Data>, code: 200 | 201 = 200) => {
    return c.json({success: true, ...resp}, code)
}

export const SendError = (c:Context, resp: ErrorResponse, code: 400 | 401 | 403 | 404 | 500 = 500) => {
    return c.json({success: false, ...resp}, code)
}