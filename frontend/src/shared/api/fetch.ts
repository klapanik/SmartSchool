import { BASE_URL } from "./config";

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
    }

    return response.json();
}