import { useEffect, useState } from 'react';
// import useLocalStorage from 'use-local-storage';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initial value from localStorage or prefers-color-scheme
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
