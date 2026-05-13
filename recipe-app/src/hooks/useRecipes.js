import { useState, useEffect } from 'react'
import { seedRecipes } from '../data/recipes'
import { api } from '../services/api'

const STORAGE_KEY = 'recipe-book-recipes'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : seedRecipes
  } catch {
    return seedRecipes
  }
}

export function useRecipes(token) {
  const [recipes, setRecipes] = useState(loadFromStorage)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  // When a token is provided, fetch from API
  useEffect(() => {
    if (!token) return
    setLoading(true)
    setApiError(null)
    api.getRecipes(token, { limit: 100 })
      .then(({ data }) => setRecipes(data))
      .catch(err => setApiError(err.message))
      .finally(() => setLoading(false))
  }, [token])

  // Persist to localStorage only in offline mode
  useEffect(() => {
    if (!token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
    }
  }, [recipes, token])

  async function addRecipe(data) {
    if (token) {
      try {
        const recipe = await api.createRecipe(token, data)
        setRecipes(prev => [recipe, ...prev])
      } catch (err) {
        setApiError(err.message)
      }
    } else {
      const recipe = {
        id: crypto.randomUUID(),
        liked: false,
        createdAt: Date.now(),
        ...data,
      }
      setRecipes(prev => [recipe, ...prev])
    }
  }

  async function removeRecipe(id) {
    if (token) {
      try {
        await api.deleteRecipe(token, id)
      } catch (err) {
        setApiError(err.message)
        return
      }
    }
    setRecipes(prev => prev.filter(r => r.id !== id))
  }

  async function toggleLike(id) {
    const recipe = recipes.find(r => r.id === id)
    if (!recipe) return
    const liked = !recipe.liked
    if (token) {
      try {
        await api.updateRecipe(token, id, { liked })
      } catch (err) {
        setApiError(err.message)
        return
      }
    }
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, liked } : r))
  }

  return { recipes, addRecipe, removeRecipe, toggleLike, loading, apiError }
}
