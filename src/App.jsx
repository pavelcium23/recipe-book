import { useState, useMemo } from 'react'
import { useRecipes } from './hooks/useRecipes'
import { RecipeList } from './components/RecipeList'
import { AddRecipeModal } from './components/AddRecipeModal'
import { SearchBar } from './components/SearchBar'
import { CategoryTabs } from './components/CategoryTabs'
import './App.css'

function App() {
  const { recipes, addRecipe, removeRecipe, toggleLike } = useRecipes()
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    let result = recipes

    if (activeCategory === 'Favourites') {
      result = result.filter(r => r.liked)
    } else if (activeCategory !== 'All') {
      result = result.filter(r => r.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.ingredients.some(ing => ing.toLowerCase().includes(q))
      )
    }

    return result
  }, [recipes, activeCategory, search])

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__left">
          <span className="app-logo">🍳</span>
          <h1>Recipe Book</h1>
        </div>
        <button className="btn btn--primary" onClick={() => setShowModal(true)}>
          + Add Recipe
        </button>
      </header>

      <main className="app-main">
        <div className="app-toolbar">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <RecipeList recipes={filtered} onRemove={removeRecipe} onToggleLike={toggleLike} />
      </main>

      {showModal && (
        <AddRecipeModal onAdd={addRecipe} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default App
