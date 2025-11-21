import React from 'react'

import { Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, Brush } from 'recharts'
import { toPng } from 'html-to-image'

import Button from '../../ui/Button/Button'
import CheckBox from '../../ui/CheckBox/CheckBox'

import { useChartData } from '../../hooks/useChartData'
import rawData from "../../data/data.json"
import { LINE_STYLE_OPTIONS } from '../../constants'

import type { LineStyle, Variation } from '../../interfaces'


import styles from "./Chart.module.css"

const variations: Variation[] = rawData.variations.map(v => ({
    id: v.id,
    name: v.name
}))

const lineTypeMap: Record<string, "linear" | "monotone"> = {
    line: "linear",
    smooth: "monotone",
}


function Chart() {

    const { chartData, view, setView } = useChartData({ variations, data: rawData.data })

    const [selectedVariations, setSelectedVariations] = React.useState<string[]>(variations.map(v => v.id?.toString() || '0'))
    const [lineStyle, setLineStyle] = React.useState<LineStyle>("line");

    const chartRef = React.useRef<HTMLDivElement>(null);

    const handleExport = () => {

        if (chartRef.current === null) return;

        toPng(chartRef.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'chart.png';
                link.href = dataUrl;
                link.click();
            })

    };

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

    function lineStyleOptionsRenderer() {

        return <div className={styles.actions_lineStyileOptions}>

            {LINE_STYLE_OPTIONS.map(opt => (
                <Button
                    key={opt.id}
                    isActive={lineStyle === opt.id}
                    onClick={() => setLineStyle(opt.id)}>
                    {opt.label}
                </Button>
            ))}

        </div>

    }

    function actionsRenderer() {

        return <div className={styles.actions_variations}>

            <span>Variations:</span>

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

        return <ResponsiveContainer
            ref={chartRef}
            width="100%"
            height="100%">

            <AreaChart
                data={chartData}
                margin={{ top: 10, right: 100, bottom: 10, left: 40 }}>
                <XAxis
                    dataKey="date"
                    tick={{ fill: 'var(--text-primary)' }}
                    axisLine={{ stroke: 'var(--border-strong)' }}
                />
                <YAxis
                    unit="%"
                    tick={{ fill: 'var(--text-primary)' }}
                    axisLine={{ stroke: 'var(--border-strong)' }} />

                <Tooltip />
                <Legend />

                {variations.map(v => {

                    const id = v.id?.toString() || "0"
                    if (!selectedVariations.includes(id)) return null

                    const letter = id === "0" ? "l" : v.name.toLocaleLowerCase()

                    if (lineStyle === "area") {
                        return (
                            <Area
                                key={id}
                                type="monotone"
                                dataKey={id}
                                stroke={`var(--line-variation-${letter})`}
                                fill={`var(--line-variation-${letter})`}
                                fillOpacity={0.4} />
                        )
                    }

                    return (
                        <Line
                            key={id}
                            type={lineTypeMap[lineStyle]}
                            dataKey={id}
                            stroke={`var(--line-variation-${letter})`}
                            strokeWidth={3}
                            dot={false} />
                    )
                })}

                <Brush
                    dataKey="date"
                    height={20}
                    stroke="#8884d8"
                    tickFormatter={(val) => val} />

            </AreaChart>

        </ResponsiveContainer>

    }

    function bottomActionsRenderer() {

        return <Button
            onClick={handleExport}>
            Download chart PNG
        </Button>

    }

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                {buttonsRenderer()}
                {lineStyleOptionsRenderer()}
                {actionsRenderer()}
            </div>
            <div className={styles.chart_container}>
                {chartRenderer()}
            </div>
            <div className={styles.bottom_actions}>
                {bottomActionsRenderer()}
            </div>
        </div>
    )
}

export default Chart
