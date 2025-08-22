export function saveToken(token: string, userId: string) {
  const expiresAt = Date.now() + 1 * 60 * 60 * 1000; // 2 horas em ms
  const data = { token, expiresAt, userId };
  localStorage.setItem("auth_token", JSON.stringify(data));
}

export function getToken(): string | null {
  const raw = localStorage.getItem("auth_token");
  if (!raw) return null;

  try {
    const data = JSON.parse(raw);
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem("auth_token"); // expirada
      return null;
    }
    return data.token;
  } catch {
    return null; // se der erro no parse
  }
}

export function getUserId(): string | null {
  const raw = localStorage.getItem("auth_token");
  if (!raw) return null;

  try {
    const data = JSON.parse(raw);
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem("auth_token"); // expirada
      return null;
    }
    return data.userId;
  } catch {
    return null; // se der erro no parse
  }
}

export function clearToken() {
  localStorage.removeItem("auth_token");
}
