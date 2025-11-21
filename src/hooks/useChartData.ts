import { useMemo, useState } from "react";
import type { ChartDataItem, RawDataItem, Variation, WeekItem } from "../interfaces";

interface UseChartDataProps {
    variations: Variation[];
    data: RawDataItem[];
}

export const useChartData = ({ variations, data }: UseChartDataProps) => {

    const [view, setView] = useState<"day" | "week">("day");

    const chartData: ChartDataItem[] = useMemo(() => {

        if (view === "day") {

            return data.map(item => {

                const result: ChartDataItem = { date: item.date };

                for (const v of variations) {
                    const id = v.id ? v.id.toString() : "0";
                    const visits = item.visits[id] ?? 0;
                    const conversions = item.conversions[id] ?? 0;
                    result[id] = visits > 0 ? +(conversions / visits * 100).toFixed(2) : 0;
                }

                return result;
            });

        } else {

            const weekMap: Record<string, WeekItem> = {};

            data.forEach(item => {

                const dateObj = new Date(item.date);
                const week = `${dateObj.getFullYear()}-W${Math.ceil((dateObj.getDate() + 6 - dateObj.getDay()) / 7)}`;

                if (!weekMap[week]) {

                    const initWeek: WeekItem = { date: week, count: 0 };

                    variations.forEach(v => {
                        const id = v.id ? v.id.toString() : "0";
                        initWeek[id as keyof ChartDataItem] = 0;
                    });

                    weekMap[week] = initWeek;
                }

                weekMap[week].count += 1;

                variations.forEach(v => {

                    const id = v.id ? v.id.toString() : "0";
                    const visits = item.visits[id] ?? 0;
                    const conversions = item.conversions[id] ?? 0;
                    const prev = weekMap[week][id as keyof ChartDataItem] as number;

                    weekMap[week][id as keyof ChartDataItem] = prev + (visits > 0 ? (conversions / visits) * 100 : 0);
                });
            });

            return Object.values(weekMap).map(weekItem => {

                const result: ChartDataItem = { date: weekItem.date };

                Object.keys(weekItem).forEach(key => {
                    if (key !== "date" && key !== "count") {
                        const val = weekItem[key as keyof ChartDataItem] as number;
                        result[key as keyof ChartDataItem] = +(val / weekItem.count).toFixed(2);
                    }
                });

                return result;
            });
        }

    }, [data, variations, view]);


    return { chartData, view, setView };
};
