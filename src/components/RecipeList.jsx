import { RecipeCard } from './RecipeCard'

export function RecipeList({ recipes, onRemove, onToggleLike }) {
  if (recipes.length === 0) {
    return (
      <div className="recipe-list__empty">
        <p>No recipes found.</p>
        <p>Try a different search or category!</p>
      </div>
    )
  }

  return (
    <ul className="recipe-list">
      {recipes.map(recipe => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} onRemove={onRemove} onToggleLike={onToggleLike} />
        </li>
      ))}
    </ul>
  )
}
