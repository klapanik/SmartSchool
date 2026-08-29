import { apiFetch } from "@/shared/api/fetch";
import type { Subject } from "../model/type";
import { useQuery } from "@tanstack/react-query";

export function useSubjectsQuery() {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: () => apiFetch<Subject[]>(`/subjects/`, { method: "GET" }),
        staleTime: Infinity,
    });
}

export function useSubjectsCountQuery() {
    return useQuery({
        queryKey: ["subjects", "count"],
        queryFn: () => apiFetch<{ count: number }>(`/subjects/?count_only=true`, { method: "GET" }),
        staleTime: Infinity,
    });
}
