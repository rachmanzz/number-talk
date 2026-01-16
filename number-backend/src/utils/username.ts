import type { Context } from "hono"
import { getSignedCookie } from "hono/cookie"

export const getUserName = async (c: Context, secret: string) => {
    const signUser = await getSignedCookie(c, secret, "auth-session")
      // force string because I have validate on middleware
      const userSign = (signUser as string).split("|") 

      return userSign[0]
}