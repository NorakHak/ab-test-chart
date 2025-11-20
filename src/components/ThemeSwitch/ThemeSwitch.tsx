import React from "react";

import Sun from "../../svgs/Sun.svg?react";
import Moon from "../../svgs/Moon.svg?react";

import styles from "./ThemeSwitch.module.css";

const ThemeSwitch = () => {

    function setDarkMode() {
        document.querySelector("body")?.setAttribute("data-theme", "dark")
    }

    function setLightMode() {
        document.querySelector("body")?.setAttribute("data-theme", "light")
    }

    function toggleTheme(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setDarkMode()
        } else {
            setLightMode()
        }
    }

    return (
        <div className={styles.theme_switch_container}>
            <input
                className={styles.theme_switch_input}
                type='checkbox'
                id='darkmode-toggle'
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
