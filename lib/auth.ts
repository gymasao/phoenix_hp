const encoder = new TextEncoder();

export const SESSION_COOKIE = "phoenix_session";
const SESSION_VALUE = "authenticated";

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function sign(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toHex(signature);
}

// AUTH_SECRET で署名したトークンなので、cookieを直接偽造することはできない
export async function createSessionToken(secret: string): Promise<string> {
  const signature = await sign(secret, SESSION_VALUE);
  return `${SESSION_VALUE}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined
): Promise<boolean> {
  if (!token || !secret) return false;
  const [value, signature] = token.split(".");
  if (value !== SESSION_VALUE || !signature) return false;
  const expected = await sign(secret, SESSION_VALUE);
  return timingSafeEqual(signature, expected);
}
