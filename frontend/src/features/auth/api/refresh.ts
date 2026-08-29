import { BASE_URL } from "@/shared/api/config";
import { setAccessToken } from "../model/token-storage";

export async function refreshAccessToken() {
    const response = await fetch(`${BASE_URL}/user/refresh/`, {
        method: "POST",
        credentials: "include",
    });
    
    if (response.status === 401) {
        throw new Error('Invalid refresh token')
    }

    if (!response.ok) {
        throw new Error("Failed to refresh token");
    }

    const data = await response.json();

    setAccessToken(data.access);
    return data.access;
}