import { apiFetch } from "@/shared/api/fetch";
import type { Schedule } from "../model/type";
import { useQuery } from "@tanstack/react-query";

export function useScheduleQuery() {
    return useQuery({
        queryKey: ["schedule"],
        queryFn: () => apiFetch<Schedule>("/schedule/", { method: "GET" }),
        staleTime: Infinity,
    });
}
