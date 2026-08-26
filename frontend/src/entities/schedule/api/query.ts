import { apiFetch } from "@/shared/api/fetch";
import type { ScheduleDay } from "../model/type";
import { useQuery } from "@tanstack/react-query";

export function useScheduleQuery() {
    return useQuery({
        queryKey: ["schedule"],
        queryFn: () => apiFetch<ScheduleDay>("/schedule/", { method: "GET" }),
        staleTime: Infinity,
    });
}
