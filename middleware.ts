import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./lib/auth";

// サイト全体をパスワード保護する。有効な場合のみ/loginへ誘導し、cookieのセッションを検証する。
export async function middleware(request: NextRequest) {
  const password = process.env.AUTH_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  // 環境変数が未設定の場合は認証をスキップ(ローカル開発などで誤って締め出さないため)
  if (!password || !secret) {
    return new NextResponse("Authentication configuration error", {
      status: 500,
    });
  }

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/login") || pathname.startsWith("/api/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token, secret)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
