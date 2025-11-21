import type { LineStyle } from "../interfaces";

export const LINE_STYLES: LineStyle[] = ["line", "smooth", "area"];

export const LINE_STYLE_OPTIONS = [
    { id: "line", label: "Line" },
    { id: "smooth", label: "Smooth" },
    { id: "area", label: "Area" }
] as const;