let accessToken = "";

export function getAccessToken() {
    return accessToken;
}

export function setAccessToken(newToken: string) {
    accessToken = newToken;
}

export function cleanAccessToken() {
    accessToken = "";
}
