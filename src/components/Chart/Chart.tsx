import React from 'react'

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useChartData } from '../../hooks/useChartData'
import rawData from "../../data/data.json"
import type { Variation } from '../../interfaces'

import styles from "./Chart.module.css"
import Button from '../../ui/Button/Button'
import { CheckBox } from '../../ui/CheckBox/CheckBox'

const variations: Variation[] = rawData.variations.map(v => ({
    id: v.id,
    name: v.name
}))

function Chart() {

    const { chartData, view, setView } = useChartData({ variations, data: rawData.data })

    const [selectedVariations, setSelectedVariations] = React.useState<string[]>(variations.map(v => v.id?.toString() || '0'))

    function toggleVariation(id: string) {

        setSelectedVariations(prev => {
            const isActive = prev.includes(id);

            if (isActive && prev.length === 1) {
                return prev;
            }

            if (isActive) {
                return prev.filter(v => v !== id);
            }

            return [...prev, id];
        })

    }

    function buttonsRenderer() {

        return <div className={styles.actions_buttons}>
            <Button
                isActive={view === "day"}
                onClick={() => setView('day')}>
                Day
            </Button>
            <Button
                isActive={view === "week"}
                onClick={() => setView('week')}>
                Week
            </Button>
        </div>

    }

    function actionsRenderer() {

        return <div className={styles.actions_variations}>
            {variations.map(v => (
                <CheckBox
                    label={v.name}
                    checked={selectedVariations.includes(v.id?.toString() || '0')}
                    onChange={() => toggleVariation(v.id?.toString() || '0')}
                />
            ))}
        </div>

    }

    function chartRenderer() {

        return <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <XAxis
                    dataKey="date"
                    tick={{ fill: 'var(--text-primary)' }}
                    axisLine={{ stroke: 'var(--border-strong)' }} />
                <YAxis
                    unit="%"
                    tick={{ fill: 'var(--text-primary)' }}
                    axisLine={{ stroke: 'var(--border-strong)' }} />
                <Tooltip />
                <Legend />
                {variations.map(v => {
                    const id = v.id?.toString() || '0'
                    return selectedVariations.includes(id) ? (
                        <Line key={id} type="monotone" dataKey={id} />
                    ) : null
                })}
            </LineChart>
        </ResponsiveContainer>

    }

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                {buttonsRenderer()}
                {actionsRenderer()}
            </div>
            <div className={styles.chart_container}>
                {chartRenderer()}
            </div>
        </div>
    )
}

export default Chart
