import { factory } from "../factory.js";
import z from 'zod'
import { zValidator } from '@hono/zod-validator'
import { hashPassword } from "../utils/password.js";
import { DBAdapter } from "../utils/db-adapter.js";
import { createUser } from "../repositories/user/index.js";

const insertUserSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string()
})

function serializeBigInt<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? Number(value) : value
    )
  )
}


export const HandleCreateUser = factory.createHandlers(zValidator("json", insertUserSchema), async (c) => {
    try {
        const user = c.req.valid('json')
        const signPass = await hashPassword(user.password)
        const copy = { ...user, password:  signPass}
        const db = DBAdapter(c.env.DB)
        const result = await createUser(db, copy)
        return c.json(serializeBigInt(result))
    } catch (e) {
        console.log(e instanceof Error ? e.message : e)
        return c.json({error: "error create"})
    }

})