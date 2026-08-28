import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/fetch";

import { getGrades } from "./get-grades";

import type { AverageGrade, QuarterData } from "../model/types";
import type { gradesQueryParams } from "./get-grades";

export function useQuartersGradesQuery() {
    return useQuery({
        queryKey: ["quarters_grades"],
        queryFn: () => apiFetch<QuarterData[]>("/quarters/grades/", { method: "GET" }),
        staleTime: 5 * 60 * 1000,
        refetchInterval: 5 * 60 * 1000,
    });
}

export function useGradesQuery(params: gradesQueryParams) {
    return useQuery({
        queryKey: ["grades", params],
        queryFn: () => getGrades(params),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 2 * 60 * 1000,
    });
}

export function useAverageGradeQuery() {
    return useQuery({
        queryKey: ["grades", "average"],
        queryFn: () => apiFetch<{ average: number }>("/grades/average/", { method: "GET" }),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 2 * 60 * 1000,
    });
}

export function useAverageGradesQuery() {
    return useQuery({
        queryKey: ["grades", "averages_by_subjects"],
        queryFn: () =>
            apiFetch<AverageGrade[]>("/grades/average/?group_by=subjects", { method: "GET" }),
        staleTime: 2 * 60 * 1000,
        refetchInterval: 2 * 60 * 1000,
    });
}
