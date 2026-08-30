import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/fetch";
import type { User, Analytics } from "../model/type";

export function useCurrentUserQuery() {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => apiFetch<User>("/user/me/", { method: "GET" }),
        staleTime: Infinity,
    });
}

export function useAnalyticsQuery() {
    return useQuery({
        queryKey: ["user", "analytics"],
        queryFn: () => apiFetch<Analytics>("/analytics/", { method: "GET" }),
        staleTime: Infinity,
    });
}
