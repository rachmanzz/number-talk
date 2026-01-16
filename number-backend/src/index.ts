import { factory } from './factory.js'
import { HandleLoginUser, HandleRegisterUser, HandleUserInfo, HandleUserLogout } from './handlers/users.auth.handler.js'
import { cors } from 'hono/cors'
import { env } from 'hono/adapter'
import { AuthMiddleware } from './middlewares/auth.js'
import { HandleCreateNode, HandleGetNodeTree } from './handlers/nodes.handler.js'
const app = factory.createApp()

app.use(cors({
  origin(origin, c) {
    return origin.endsWith("rahmanzz.workers.dev") ? origin : "http://localhost:5173"
  },
  credentials: true
}))
// bid: c.env.SECRET_SIGN 

app.get('/', async (c) => {

  return c.json({type: "cloudflare worker", act: "handle apis"})
})

app.post('/auth/user/register', ...HandleRegisterUser)
app.post('/auth/user/login', ...HandleLoginUser)
app.delete("/auth/user/logout", AuthMiddleware, ...HandleUserLogout)

const authorizedApp = app.basePath("/authorized")
authorizedApp.use(AuthMiddleware)
authorizedApp.get("/user/info", ...HandleUserInfo)

authorizedApp.post("/node/operation", ...HandleCreateNode)

app.get("/open/node-trees", ...HandleGetNodeTree)

export default app