import { refreshAccessToken } from "@/features/auth/api/refresh";
import { BASE_URL } from "./config";
import { getAccessToken } from "@/features/auth/model/token-storage";

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getAccessToken();

    let response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
    });

    if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${newAccessToken}` } : {}),
            },
        });
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
    }

    return response.json();
}
