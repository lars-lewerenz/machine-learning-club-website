import { useEffect, useState } from "react";

export function useDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("darkMode");
        const system = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initial = saved !== null ? saved === "true" : system;
        setDarkMode(initial);
        document.documentElement.classList.toggle("dark", initial);

        const listener = (e) => {
            if (localStorage.getItem("darkMode") === null) {
                setDarkMode(e.matches);
                document.documentElement.classList.toggle("dark", e.matches);
            }
        };

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, []);

    const toggleDarkMode = () => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem("darkMode", next.toString());
        // Toggle the dark class based on the new mode
        if (next) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return [darkMode, toggleDarkMode];
}
