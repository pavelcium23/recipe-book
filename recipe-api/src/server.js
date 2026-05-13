import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import tokenRouter from './routes/token.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/token', tokenRouter)

app.listen(PORT, () => {
  console.log(`Recipe API running on http://localhost:${PORT}`)
  console.log(`Token endpoint: POST http://localhost:${PORT}/token`)
})
