import { RecipeCard } from './RecipeCard'

export function RecipeList({ recipes, onRemove }) {
  if (recipes.length === 0) {
    return (
      <div className="recipe-list__empty">
        <p>No recipes found.</p>
        <p>Add one with the button above!</p>
      </div>
    )
  }

  return (
    <ul className="recipe-list">
      {recipes.map(recipe => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  )
}
