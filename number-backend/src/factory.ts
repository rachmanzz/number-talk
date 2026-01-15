import { createFactory } from 'hono/factory'

type Bindings = {
  DB: D1Database
}

export const factory = createFactory<{ Bindings: Bindings }>()