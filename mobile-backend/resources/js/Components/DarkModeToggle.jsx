import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 shadow-md"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
}