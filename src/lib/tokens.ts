const accessTokenKey = '@access-token';

export function getAccessToken(): string | null {
    return localStorage.getItem(accessTokenKey);
}

export function updateAccessToken(token: string) {
    localStorage.setItem(accessTokenKey, token);
}

export function removeAccessToken() {
    localStorage.removeItem(accessTokenKey);
}
