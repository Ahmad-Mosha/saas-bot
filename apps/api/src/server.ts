import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello from Hono! 🚀'))

app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello, world!' })
})

export default app