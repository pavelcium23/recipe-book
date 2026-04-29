export function RecipeCard({ recipe, onRemove }) {
  const { title, category, ingredients, steps, liked } = recipe

  return (
    <article className="recipe-card">
      <div className="recipe-card__header">
        <span className="recipe-card__category">{category}</span>
        <button
          className="recipe-card__delete"
          onClick={() => onRemove(recipe.id)}
          aria-label={`Delete ${title}`}
        >
          🗑
        </button>
      </div>

      <h2 className="recipe-card__title">{title}</h2>

      <div className="recipe-card__meta">
        <span>{ingredients.length} ingredients</span>
        <span>{steps.length} steps</span>
        {liked && <span className="recipe-card__liked">♥ Liked</span>}
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
