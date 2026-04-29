import { useRecipes } from './hooks/useRecipes'
import './App.css'

function App() {
  const { recipes } = useRecipes()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipe Book</h1>
      </header>
      <main className="app-main">
        <p>{recipes.length} recipes loaded from storage.</p>
      </main>
    </div>
  )
}

export default App
