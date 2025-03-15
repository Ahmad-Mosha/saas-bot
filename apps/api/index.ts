import { serve } from '@hono/node-server'
import app from './src/server'

serve({
  fetch: app.fetch,
  port: 3001,
})

console.log('🔥 Hono server running on http://localhost:3001')