import { useState } from 'react'

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']

const empty = { title: '', category: 'Dinner', ingredients: '', steps: '' }

export function AddRecipeModal({ onAdd, onClose }) {
  const [form, setForm] = useState(empty)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const ingredients = form.ingredients.split('\n').map(s => s.trim()).filter(Boolean)
    const steps = form.steps.split('\n').map(s => s.trim()).filter(Boolean)
    if (!form.title.trim() || ingredients.length === 0 || steps.length === 0) return
    onAdd({ title: form.title.trim(), category: form.category, ingredients, steps })
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 id="modal-title">Add Recipe</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Pancakes" required />
          </label>

          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>

          <label>
            Ingredients <span className="modal__hint">(one per line)</span>
            <textarea name="ingredients" value={form.ingredients} onChange={handleChange} rows={5} placeholder={'2 eggs\n1 cup flour\n...'} required />
          </label>

          <label>
            Steps <span className="modal__hint">(one per line)</span>
            <textarea name="steps" value={form.steps} onChange={handleChange} rows={6} placeholder={'Mix dry ingredients.\nAdd wet ingredients.\n...'} required />
          </label>

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary">Save Recipe</button>
          </div>
        </form>
      </div>
    </div>
  )
}
