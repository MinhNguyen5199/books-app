'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const applyTheme = (theme: Theme) => {
      const root = document.documentElement
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.remove('dark')
      if (theme === 'dark' || (theme === 'system' && systemDark)) {
        root.classList.add('dark')
      }
    }

    const stored = localStorage.getItem('theme') as Theme | null
    const preferred: Theme = stored || 'system'
    applyTheme(preferred)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (localStorage.getItem('theme') === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return <>{children}</>
}
