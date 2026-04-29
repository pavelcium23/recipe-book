export function RecipeCard({ recipe, onRemove, onToggleLike }) {
  const { title, category, ingredients, steps, liked } = recipe

  return (
    <article className="recipe-card">
      <div className="recipe-card__header">
        <span className="recipe-card__category">{category}</span>
        <div className="recipe-card__actions">
          <button
            className={`recipe-card__like ${liked ? 'recipe-card__like--active' : ''}`}
            onClick={() => onToggleLike(recipe.id)}
            aria-label={liked ? `Unlike ${title}` : `Like ${title}`}
            aria-pressed={liked}
          >
            {liked ? '♥' : '♡'}
          </button>
          <button
            className="recipe-card__delete"
            onClick={() => onRemove(recipe.id)}
            aria-label={`Delete ${title}`}
          >
            🗑
          </button>
        </div>
      </div>

      <h2 className="recipe-card__title">{title}</h2>

      <div className="recipe-card__meta">
        <span>{ingredients.length} ingredients</span>
        <span>{steps.length} steps</span>
      </div>

      <details className="recipe-card__details">
        <summary>View recipe</summary>

        <section>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </section>

        <section>
          <h3>Steps</h3>
          <ol>
            {steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </section>
      </details>
    </article>
  )
}
