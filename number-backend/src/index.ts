import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ "helo": "work" })
})

export default app
