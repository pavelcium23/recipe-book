import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.js'
import tokenRouter from './routes/token.js'
import recipesRouter from './routes/recipes.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/docs.json', (_req, res) => res.json(swaggerSpec))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/token', tokenRouter)
app.use('/recipes', recipesRouter)

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

app.listen(PORT, () => {
  console.log(`Recipe API running on http://localhost:${PORT}`)
  console.log(`Swagger docs:    http://localhost:${PORT}/docs`)
  console.log(`Token endpoint:  POST http://localhost:${PORT}/token`)
})
