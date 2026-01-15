import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { runtime } from './runtime.js'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ "helo": "work" })
})

if (runtime.type !== "cloudflare-worker") {
  serve({
    fetch: app.fetch,
    port: 3000
  }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  })
}

export default app
