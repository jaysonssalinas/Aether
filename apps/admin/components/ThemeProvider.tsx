'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'dark-indigo';

const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: 'light',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const saved = (localStorage.getItem('aether_admin_theme') as Theme) || 'light';
    setThemeState(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem('aether_admin_theme', t);
    document.documentElement.dataset.theme = t;
  }

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
