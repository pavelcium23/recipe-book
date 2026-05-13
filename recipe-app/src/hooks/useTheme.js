import { useState, useEffect } from 'react'

const STORAGE_KEY = 'recipe-book-theme'

function getInitial() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
