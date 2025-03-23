import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from "./lib/apiConfig";

export function middleware(request: NextRequest) {
  // Only apply to API requests to the Platzi API
  if (request.nextUrl.pathname.startsWith("/api/products")) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const headers = new Headers(request.headers);

    // Forward the request to Platzi API
    const url = new URL(request.url);
    const targetUrl = new URL(
      `${API_BASE_URL}${API_ENDPOINTS.products.base}${url.search}`
    );

    return NextResponse.rewrite(targetUrl, {
      headers: DEFAULT_HEADERS,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/products/:path*",
};
