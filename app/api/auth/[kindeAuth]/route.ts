import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest | Request, { params }: any) {
  const endpoint = params.kindeAuth;
  return await handleAuth(request, endpoint);
}
