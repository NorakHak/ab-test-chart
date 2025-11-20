import React from 'react'

import styles from "./Button.module.css"

interface ButtonProps {
    isActive?: boolean;
    children: React.ReactNode;
    onClick: () => void;
}

export default function Button({ isActive, onClick, children }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ""}`}
            onClick={onClick}>
            {children}
        </button>
    )
}
