import { useState } from 'react'
import { useRecipes } from './hooks/useRecipes'
import { RecipeList } from './components/RecipeList'
import { AddRecipeModal } from './components/AddRecipeModal'
import './App.css'

function App() {
  const { recipes, addRecipe, removeRecipe } = useRecipes()
  const [showModal, setShowModal] = useState(false)

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
        <RecipeList recipes={recipes} onRemove={removeRecipe} />
      </main>

      {showModal && (
        <AddRecipeModal onAdd={addRecipe} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default App
