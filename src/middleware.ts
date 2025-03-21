import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply to API requests to the Platzi API
  if (request.nextUrl.pathname.startsWith("/api/products")) {
    const headers = new Headers(request.headers);

    // Forward the request to Platzi API
    const url = new URL(request.url);
    const targetUrl = new URL(
      `https://api.escuelajs.co/api/v1/products${url.search}`
    );

    return NextResponse.rewrite(targetUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/products/:path*",
};
