import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Check if the app is running in production
  if (process.env.NODE_ENV === "production") {
    // Redirect to www if not already using www
    if (!url.hostname.startsWith("www")) {
      url.hostname = `www.${url.hostname}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Continue without redirect if in dev or condition is not met
}
