import z from "zod"

export const responseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    error: z.unknown().optional(),
    data: z.unknown().optional()
})

export const userRespSchema = z.object({name: z.string(), username: z.string()})