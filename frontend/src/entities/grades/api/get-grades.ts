import { apiFetch } from "@/shared/api/fetch";
import type { Grade } from "../model/types";

export type gradesQueryParams = {
    quarter?: string | number;
    subject?: number;
    from?: string;
    to?: string;
};

export function getGrades(params: gradesQueryParams = {}) {
    const searchParams = new URLSearchParams();

    if (params.quarter !== undefined) {
        searchParams.set("quarter", String(params.quarter));
    }

    if (params.subject !== undefined) {
        searchParams.set("subject", String(params.subject));
    }

    if (params.from !== undefined) {
        searchParams.set("from", String(params.from));
    }

    if (params.to !== undefined) {
        searchParams.set("to", String(params.to));
    }

    const queryString = searchParams.toString();

    return apiFetch<Grade[]>(`/grades/${queryString ? `?${queryString}` : ""}`, { method: "GET" });
}
