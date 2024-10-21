import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong...");
  }

  await prisma.user.upsert({
    where: {
      email: user.email ? user.email : "",
    },
    create: {
      id: user.id,
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
      email: user.email ?? "",
      profileImage:
        user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
    },
    update: {
      id: user.id,
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
      email: user.email ?? "",
      profileImage:
        user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
    },
  });

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://www.digigo.studio/"
  );
}
