import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/fetch";
import type { Quarter } from "../model/type";

export function useQuartersQuery() {
    return useQuery({
        queryKey: ["quarters"],
        queryFn: () => apiFetch<Quarter[]>("/quarters/", { method: "GET" }),
        staleTime: Infinity,
    });
}
