import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Check if the environment is production
  if (process.env.NODE_ENV === "production") {
    // Redirect from non-www to www only if the domain does not start with 'www'
    if (url.hostname === "digigo.studio") {
      url.hostname = "www.digigo.studio";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Continue without redirect if condition is not met
}
