import { useMemo, useState } from "react";
import type { ChartDataItem, RawDataItem, Variation } from "../interfaces";

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

            const weekMap: Record<string, ChartDataItem> = {};

            data.forEach(item => {

                const dateObj = new Date(item.date);

                const week = `${dateObj.getFullYear()}-W${Math.ceil((dateObj.getDate() + 6 - dateObj.getDay()) / 7)}`;

                if (!weekMap[week]) {

                    weekMap[week] = { date: week };

                    for (const v of variations) {
                        const id = v.id ? v.id.toString() : "0";
                        weekMap[week][id] = 0;
                    }

                }

                for (const v of variations) {

                    const id = v.id ? v.id.toString() : "0";
                    const visits = item.visits[id] ?? 0;
                    const conversions = item.conversions[id] ?? 0;

                    weekMap[week][id] =
                        ((weekMap[week][id] as number) + (visits > 0 ? (conversions / visits) * 100 : 0)) / 2;
                }

            });


            return Object.values(weekMap);

        }

    }, [data, variations, view]);

    return { chartData, view, setView };
};
