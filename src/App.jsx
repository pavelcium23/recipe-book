import { useState, useMemo } from 'react'
import { useRecipes } from './hooks/useRecipes'
import { useTheme } from './hooks/useTheme'
import { RecipeList } from './components/RecipeList'
import { AddRecipeModal } from './components/AddRecipeModal'
import { SearchBar } from './components/SearchBar'
import { CategoryTabs } from './components/CategoryTabs'
import './App.css'

function App() {
  const { recipes, addRecipe, removeRecipe, toggleLike } = useRecipes()
  const { theme, toggleTheme } = useTheme()
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
        <div className="app-header__right">
          <button
            className="btn btn--ghost btn--icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="btn btn--primary" onClick={() => setShowModal(true)}>
            + Add Recipe
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="app-toolbar">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <p className="app-count">
          {filtered.length} {filtered.length === 1 ? 'recipe' : 'recipes'}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          {search ? ` matching "${search}"` : ''}
        </p>
        <RecipeList recipes={filtered} onRemove={removeRecipe} onToggleLike={toggleLike} />
      </main>

      <footer className="app-footer">
        <p>Recipe Book &mdash; your personal kitchen companion</p>
      </footer>

      {showModal && (
        <AddRecipeModal onAdd={addRecipe} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default App
