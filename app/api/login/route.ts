import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  const password = process.env.AUTH_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  if (!password || !secret) {
    return NextResponse.json({ error: "サーバー側で認証が設定されていません。" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const inputPassword: string = body?.password ?? "";
  const redirect: string = typeof body?.redirect === "string" ? body.redirect : "/";

  if (inputPassword !== password) {
    return NextResponse.json({ error: "パスワードが正しくありません。" }, { status: 401 });
  }

  const token = await createSessionToken(secret);
  const response = NextResponse.json({ ok: true, redirect });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
