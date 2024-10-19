const accessTokenKey = '@access-token';
const refreshTokenKey = '@refresh-token';

export function getAccessToken(): string | null {
    return localStorage.getItem(accessTokenKey);
}

export function updateAccessToken(token: string) {
    localStorage.setItem(accessTokenKey, token);
}

export function removeAccessToken() {
    localStorage.removeItem(accessTokenKey);
}

export function getRefreshToken(): string | null {
    return localStorage.getItem(refreshTokenKey);
}

export function updateRefreshToken(token: string) {
    localStorage.setItem(refreshTokenKey, token);
}

export function removeRefreshToken() {
    localStorage.removeItem(refreshTokenKey);
}

export function removeTokens() {
    removeAccessToken();
    removeRefreshToken();
}
