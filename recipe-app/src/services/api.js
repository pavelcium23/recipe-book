const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function request(path, options = {}, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw Object.assign(new Error(body.error || res.statusText), { status: res.status })
  }
  return body
}

export const api = {
  getRecipes:    (token, params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/recipes${q ? '?' + q : ''}`, {}, token)
  },
  createRecipe:  (token, data)     => request('/recipes',      { method: 'POST',   body: JSON.stringify(data) }, token),
  updateRecipe:  (token, id, data) => request(`/recipes/${id}`, { method: 'PUT',    body: JSON.stringify(data) }, token),
  deleteRecipe:  (token, id)       => request(`/recipes/${id}`, { method: 'DELETE' }, token),
  getToken:      (role)            => request('/token',         { method: 'POST',   body: JSON.stringify({ role }) }),
}
