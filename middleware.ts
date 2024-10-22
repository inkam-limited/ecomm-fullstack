import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Check if the app is running in production
  if (process.env.NODE_ENV === "production") {
    // If the hostname is not www and is not localhost (for dev purposes), then redirect
    if (
      !url.hostname.startsWith("www") &&
      !url.hostname.includes("localhost")
    ) {
      // Redirect only if the hostname doesn't already start with 'www'
      url.hostname = `www.${url.hostname}`;
      return NextResponse.redirect(url, 308); // Permanent redirect (308)
    }
  }

  // Continue processing the request without redirection if the condition is not met
  return NextResponse.next();
}
