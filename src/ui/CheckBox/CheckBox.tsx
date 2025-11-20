import React from 'react'

import styles from "./CheckBox.module.css"

interface ChartCheckboxProps {
    checked: boolean;
    label: string;
    onChange: (val: boolean) => void;
}

export function CheckBox({ checked, onChange, label }: ChartCheckboxProps) {
    return (
        <label className={styles.checkbox}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className={styles.checkbox_box}></span>
            {label}
        </label>
    );
}