import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';

      if (!window.matchMedia) return false;

      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const root = document.documentElement;
      root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.warn('Could not access localStorage or document', error);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggleDarkMode };
};
export default useDarkMode;
