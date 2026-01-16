import { factory } from "../factory.js";

import {
  getSignedCookie,
} from 'hono/cookie'
import { SendError } from "../utils/response.js";

export const AuthMiddleware = factory.createMiddleware(async(c, next) => {
    const signUser = await getSignedCookie(c, c.env.SECRET_SIGN, "auth-session")
    if (typeof signUser !== "string") return SendError(c, {message: "Unauthorized"}, 401)
    await next()
})