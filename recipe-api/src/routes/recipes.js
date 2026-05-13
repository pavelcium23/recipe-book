import { Router } from 'express'
import { recipes, nextId } from '../data/store.js'
import { authenticate, requirePermission } from '../middleware/auth.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe CRUD operations
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes (paginated)
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of recipes to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of recipes to skip
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: Paginated list of recipes
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Insufficient permissions
 */
router.get('/', authenticate, requirePermission('READ'), (req, res) => {
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10))
  const skip  = Math.max(0, parseInt(req.query.skip) || 0)
  const { category } = req.query

  let result = category
    ? recipes.filter(r => r.category.toLowerCase() === category.toLowerCase())
    : recipes

  const total = result.length
  const data  = result.slice(skip, skip + limit)

  res.json({ data, total, limit, skip })
})

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get a single recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe found
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', authenticate, requirePermission('READ'), (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id)
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' })
  res.json(recipe)
})

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, category, ingredients, steps]
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Breakfast, Lunch, Dinner, Dessert, Snack]
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Recipe created
 *       400:
 *         description: Validation error
 */
router.post('/', authenticate, requirePermission('WRITE'), (req, res) => {
  const { title, category, ingredients, steps } = req.body

  if (!title?.trim())                         return res.status(400).json({ error: 'title is required' })
  if (!category?.trim())                      return res.status(400).json({ error: 'category is required' })
  if (!Array.isArray(ingredients) || ingredients.length === 0)
    return res.status(400).json({ error: 'ingredients must be a non-empty array' })
  if (!Array.isArray(steps) || steps.length === 0)
    return res.status(400).json({ error: 'steps must be a non-empty array' })

  const recipe = {
    id: nextId(),
    title: title.trim(),
    category: category.trim(),
    ingredients,
    steps,
    liked: false,
    createdAt: Date.now(),
  }

  recipes.unshift(recipe)
  res.status(201).json(recipe)
})

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update an existing recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               liked:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Recipe updated
 *       404:
 *         description: Recipe not found
 */
router.put('/:id', authenticate, requirePermission('WRITE'), (req, res) => {
  const index = recipes.findIndex(r => r.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Recipe not found' })

  const allowed = ['title', 'category', 'ingredients', 'steps', 'liked']
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  )

  recipes[index] = { ...recipes[index], ...updates }
  res.json(recipes[index])
})

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted
 *       404:
 *         description: Recipe not found
 */
router.delete('/:id', authenticate, requirePermission('DELETE'), (req, res) => {
  const index = recipes.findIndex(r => r.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Recipe not found' })

  const [deleted] = recipes.splice(index, 1)
  res.json({ message: 'Recipe deleted', recipe: deleted })
})

export default router
