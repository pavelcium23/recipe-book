import { useState, useEffect } from 'react'
import { api } from '../services/api'

const ROLES = ['ADMIN', 'WRITER', 'VISITOR']

export function TokenPanel({ onToken }) {
  const [role, setRole] = useState('ADMIN')
  const [status, setStatus] = useState('idle') // idle | loading | active | expired | error
  const [expiresAt, setExpiresAt] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Tick to detect expiry
  useEffect(() => {
    if (!expiresAt) return
    const id = setInterval(() => {
      if (Date.now() >= expiresAt) {
        setStatus('expired')
        onToken(null)
        clearInterval(id)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [expiresAt, onToken])

  async function handleGetToken() {
    setStatus('loading')
    setErrorMsg('')
    try {
      const data = await api.getToken(role)
      setExpiresAt(Date.now() + data.expiresIn * 1000)
      setStatus('active')
      onToken(data.token)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
      onToken(null)
    }
  }

  return (
    <div className="token-panel">
      <select
        className="token-panel__select"
        value={role}
        onChange={e => setRole(e.target.value)}
        disabled={status === 'loading'}
      >
        {ROLES.map(r => <option key={r}>{r}</option>)}
      </select>

      <button
        className="btn btn--ghost token-panel__btn"
        onClick={handleGetToken}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? '…' : 'Get Token'}
      </button>

      {status === 'active'  && <span className="token-panel__badge token-panel__badge--ok">✓ {role} · 60s</span>}
      {status === 'expired' && <span className="token-panel__badge token-panel__badge--warn">⚠ Expired</span>}
      {status === 'error'   && <span className="token-panel__badge token-panel__badge--err" title={errorMsg}>✕ API offline</span>}
    </div>
  )
}
