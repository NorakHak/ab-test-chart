export interface Variation {
    id?: number;
    name: string;
}

export interface RawDataItem {
    date: string;
    visits: Record<string, number | undefined>;
    conversions: Record<string, number | undefined>;
}

export interface ChartDataItem {
    date: string;
    [variationId: string]: number | string;
}