import jwt from 'jsonwebtoken'

export function authenticate(req, res, next) {
  const header = req.headers['authorization']
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' })
  }

  const token = header.slice(7)
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    const message = err.name === 'TokenExpiredError' ? 'Token has expired' : 'Invalid token'
    res.status(401).json({ error: message })
  }
}

export function requirePermission(permission) {
  return (req, res, next) => {
    const permissions = req.user?.permissions ?? []
    if (!permissions.includes(permission)) {
      return res.status(403).json({ error: `Permission denied: ${permission} required` })
    }
    next()
  }
}
