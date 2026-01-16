import z, { ZodType, type ZodTypeAny } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { SendError } from './response.js'


export const validator = <T extends ZodType> (schema: T) => zValidator("json", schema, (result, c) => {
    if (!result.success) return SendError(c, {message: "validation error", error: result.error.message})
})