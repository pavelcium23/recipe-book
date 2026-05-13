import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

const ROLE_PERMISSIONS = {
  ADMIN:   ['READ', 'WRITE', 'DELETE'],
  WRITER:  ['READ', 'WRITE'],
  VISITOR: ['READ'],
}

const VALID_ROLES = Object.keys(ROLE_PERMISSIONS)

/**
 * POST /token
 * Body: { role: "ADMIN" | "WRITER" | "VISITOR" }
 *    or { permissions: ["READ", "WRITE", "DELETE"] }
 */
router.post('/', (req, res) => {
  const { role, permissions } = req.body

  let resolvedRole
  let resolvedPermissions

  if (role) {
    const upper = role.toUpperCase()
    if (!VALID_ROLES.includes(upper)) {
      return res.status(400).json({
        error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}`,
      })
    }
    resolvedRole = upper
    resolvedPermissions = ROLE_PERMISSIONS[upper]
  } else if (Array.isArray(permissions) && permissions.length > 0) {
    const valid = ['READ', 'WRITE', 'DELETE']
    const invalid = permissions.filter(p => !valid.includes(p.toUpperCase()))
    if (invalid.length > 0) {
      return res.status(400).json({ error: `Unknown permissions: ${invalid.join(', ')}` })
    }
    resolvedRole = 'CUSTOM'
    resolvedPermissions = permissions.map(p => p.toUpperCase())
  } else {
    return res.status(400).json({ error: 'Provide either a "role" or "permissions" array in the request body' })
  }

  const payload = { role: resolvedRole, permissions: resolvedPermissions }
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 })

  res.status(200).json({
    token,
    role: resolvedRole,
    permissions: resolvedPermissions,
    expiresIn: 60,
  })
})

export default router
