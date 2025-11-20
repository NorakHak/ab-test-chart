import Chart from '../Chart/Chart'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'

import styles from "./MainLayout.module.css"


function MainLayout() {

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>AB Chart</h1>
                    <ThemeSwitch />
                </header>
                <main className={styles.main}>
                    <Chart />
                </main>
            </div>
        </div>
    )

}

export default MainLayout
