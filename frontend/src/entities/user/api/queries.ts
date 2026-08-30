import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/fetch";
import type { User } from "../model/type";

export function useCurrentUserQuery() {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => apiFetch<User>("/user/me/", { method: "GET" }),
        staleTime: Infinity,
    });
}
