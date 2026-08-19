import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/fetch";
import type { QuarterData } from "../model/types";

export function useQuartersGradesQuery() {
    return useQuery({
        queryKey: ["quarters_grades"],
        queryFn: () => apiFetch<QuarterData[]>("/quarters/grades/", { method: "GET" }),
        staleTime: Infinity,
        gcTime: 20 * 60 * 1000,
    });
}
