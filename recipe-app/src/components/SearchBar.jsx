export function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
      <input
        type="search"
        className="search-bar__input"
        placeholder="Search by name or ingredient…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search recipes"
      />
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear search">✕</button>
      )}
    </div>
  )
}
