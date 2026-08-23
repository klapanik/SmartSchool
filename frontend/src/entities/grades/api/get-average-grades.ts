import { apiFetch } from "@/shared/api/fetch";
import type { AverageGrade } from "../model/types";

export type averageGradesQueryParams = {
    quarter?: number;
    group_by: string;
};

export function getGeneralAverageGrade(params: Pick<averageGradesQueryParams, "quarter">) {
    const searchParams = new URLSearchParams();

    if (params.quarter !== undefined) {
        searchParams.set("quarter", String(params.quarter));
    }

    const queryString = searchParams.toString();

    return apiFetch<{ average: number }>(`/grades/average/${queryString ? `?${queryString}` : ""}`);
}

export function getAverageGrades(params: averageGradesQueryParams) {
    const searchParams = new URLSearchParams();

    if (params.quarter !== undefined) {
        searchParams.set("quarter", String(params.quarter));
    }
    if (params.group_by !== undefined) {
        searchParams.set("order_by", String(params.group_by));
    }

    const queryString = searchParams.toString();

    return apiFetch<AverageGrade[]>(`/grades/average/${queryString ? `?${queryString}` : ""}`);
}
