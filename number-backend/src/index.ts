import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ "helo": "yes, is work" })
})

export default app
