import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Ensure the redirection happens only in production
  if (process.env.NODE_ENV === "production") {
    // Check if the domain is non-www and not localhost
    if (url.hostname === "digigo.studio") {
      // Redirect to the www version of the site
      url.hostname = "www.digigo.studio";
      return NextResponse.redirect(url, 308); // Use 308 for permanent redirect
    }
  }

  return NextResponse.next(); // Allow the request if conditions are not met
}
