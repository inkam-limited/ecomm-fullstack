"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const activatePlus = async (id: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isProAccount: true,
      },
    });
    return {
      success: true,
      message: "Plus account activated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to activate Plus account",
    };
  } finally {
    revalidatePath("/plus");
  }
};
