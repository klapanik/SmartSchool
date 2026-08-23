import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/fetch";
import { getGrades } from "./get-grades";

import type { QuarterData } from "../model/types";
import type { gradesQueryParams } from "./get-grades";

export function useQuartersGradesQuery() {
    return useQuery({
        queryKey: ["quarters_grades"],
        queryFn: () => apiFetch<QuarterData[]>("/quarters/grades/", { method: "GET" }),
        staleTime: 10 * 60 * 1000,
        gcTime: 20 * 60 * 1000,
    });
}

export function useGradesQuery(params: gradesQueryParams) {
    return useQuery({
        queryKey: ["grades", params],
        queryFn: () => getGrades(params),
        staleTime: 2 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
}
