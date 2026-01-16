import { factory } from "../factory.js";
import z from 'zod'
import { hashPassword, verifyPassword } from "../utils/password.js";
import { DBAdapter } from "../utils/db-adapter.js";
import { createUser, getUserByUsername } from "../repositories/user/index.js";
import { validator } from "../utils/validator.js";
import { SendError, SendSuccess } from "../utils/response.js";
import { getSignedCookie, setSignedCookie, deleteCookie} from "hono/cookie";

const insertUserSchema = z.object({
  name: z.string(),
  username: z.string().min(4),
  password: z.string().min(8)
})

// function serializeBigInt<T>(data: T): T {
//   return JSON.parse(
//     JSON.stringify(data, (_, value) =>
//       typeof value === 'bigint' ? Number(value) : value
//     )
//   )
// }


export const HandleRegisterUser = factory.createHandlers(validator(insertUserSchema), async (c) => {
  try {
    const user = c.req.valid('json')
    const signPass = await hashPassword(user.password)
    const copy = { ...user, password: signPass }
    const db = DBAdapter(c.env.DB)
    await createUser(db, copy)
    return SendSuccess(c, { message: "Register User Succesfully" }, 201)
  } catch (e) {
    if (e instanceof Error) {
      if (/UNIQUE constraint/.test(e.message)) {
        return SendError(c, { message: "username already exist" }, 401)
      }
    }
    // kysely for D1 not documented well error handle, so I pass to 500 server error
    return SendError(c, { message: "uknown error, please contact the administrator" })
  }

})

const LoginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8)
})

export const HandleLoginUser = factory.createHandlers(validator(LoginSchema), async (c) => {
  const data = c.req.valid('json')
  const db = DBAdapter(c.env.DB)
  const user = await getUserByUsername(db, data.username)
  if (!user) {
    return SendError(c, { message: "Invalid Credential" }, 401)
  }

  const verified = await verifyPassword(data.password, user.password)
  if (!verified) {
    // do not let user know is username is valid
    return SendError(c, { message: "Invalid Credential" }, 401)
  }

  const signData = `${user.username}|${Date.now()}`
  const isDev = c.env.APP_STAGE?.trim() === "development"
  await setSignedCookie(c, "auth-session", signData, c.env.SECRET_SIGN, {
    sameSite: isDev ? "Lax" : "None",
    secure: !isDev,
    domain: isDev ? undefined : "rahmanzz.workers.dev",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  })

  return SendSuccess(c, { message: "Signed" })
})


export const HandleUserInfo = factory.createHandlers(async(c)=> {
  const signUser = await getSignedCookie(c, c.env.SECRET_SIGN, "auth-session")
  // // force string because I have validate on middleware
  const userSign = (signUser as string).split("|") 
  const db = DBAdapter(c.env.DB)
  const user = await getUserByUsername(db, userSign[0])

  return SendSuccess(c, {message: "OK", data: {name: user?.name, username: user?.username}})
})


export const HandleUserLogout = factory.createHandlers(async(c)=> {
  deleteCookie(c, "auth-session")
  return SendSuccess(c, {message: "Logout"})
})
