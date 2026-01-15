import { factory } from './factory.js'
import { HandleCreateUser } from './handlers/users.handler.js'

const app = factory.createApp()

app.get('/', async (c) => {
  return c.json({type: "cloudflare worker", act: "handle apis"})
})

app.post('/auth/user/register', ...HandleCreateUser)

export default app