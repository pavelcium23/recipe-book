const TABS = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Favourites']

export function CategoryTabs({ active, onChange }) {
  return (
    <nav className="category-tabs" aria-label="Filter by category">
      {TABS.map(tab => (
        <button
          key={tab}
          className={`category-tabs__tab ${active === tab ? 'category-tabs__tab--active' : ''}`}
          onClick={() => onChange(tab)}
          aria-current={active === tab ? 'true' : undefined}
        >
          {tab}
        </button>
      ))}
    </nav>
  )
}
