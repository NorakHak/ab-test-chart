import React from "react";

import Sun from "../../svgs/Sun.svg?react";
import Moon from "../../svgs/Moon.svg?react";

import styles from "./ThemeSwitch.module.css";


const ThemeSwitch = () => {

    const [isDark, setIsDark] = React.useState(false);

    function setDarkMode() {
        document.body.setAttribute("data-theme", "dark");
        setIsDark(true);
    }

    function setLightMode() {
        document.body.setAttribute("data-theme", "light");
        setIsDark(false);
    }

    React.useEffect(() => {

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (prefersDark) {
            setDarkMode();
        } else {
            setLightMode();
        }

        const listener = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setDarkMode();
            } else {
                setLightMode();
            }
        };

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", listener);

        return () => mediaQuery.removeEventListener("change", listener);

    }, []);

    function toggleTheme(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }

    return (
        <div className={styles.theme_switch_container}>
            <input
                className={styles.theme_switch_input}
                type='checkbox'
                id='darkmode-toggle'
                checked={isDark}
                onChange={toggleTheme}
            />
            <label className={styles.theme_switch_label} htmlFor='darkmode-toggle'>
                <Sun className={styles.sun} />
                <Moon className={styles.moon} />
            </label>
        </div>
    );
};

export default ThemeSwitch;
