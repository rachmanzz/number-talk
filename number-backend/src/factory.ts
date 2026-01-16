import { createFactory } from 'hono/factory'

type Bindings = {
  DB: D1Database,
  SECRET_SIGN: string
  APP_STAGE: string
}

export const factory = createFactory<{ Bindings: Bindings }>()