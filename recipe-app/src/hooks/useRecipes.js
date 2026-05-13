import { useState, useEffect } from 'react'
import { seedRecipes } from '../data/recipes'

const STORAGE_KEY = 'recipe-book-recipes'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : seedRecipes
  } catch {
    return seedRecipes
  }
}

export function useRecipes() {
  const [recipes, setRecipes] = useState(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  function addRecipe({ title, category, ingredients, steps }) {
    const recipe = {
      id: crypto.randomUUID(),
      title,
      category,
      ingredients,
      steps,
      liked: false,
      createdAt: Date.now(),
    }
    setRecipes(prev => [recipe, ...prev])
  }

  function removeRecipe(id) {
    setRecipes(prev => prev.filter(r => r.id !== id))
  }

  function toggleLike(id) {
    setRecipes(prev =>
      prev.map(r => r.id === id ? { ...r, liked: !r.liked } : r)
    )
  }

  return { recipes, addRecipe, removeRecipe, toggleLike }
}
