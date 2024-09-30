import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const validateUserSession = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new UploadThingError("Unauthorized");
  return { userId: user.id };
};

export const ourFileRouter = {
  // Image uploader route
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      return await validateUserSession();
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after the upload completes
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      return { uploadedBy: metadata.userId };
    }),

  bannerImageRoute: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      return await validateUserSession();
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Banner upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      return { uploadedBy: metadata.userId };
    }),
  productFileUploader: f({
    // Configure allowed file types and sizes for product files
    blob: { maxFileSize: "16MB" }, // Example: Allow only PDF files up to 16MB
    // Add more file types as needed (e.g., 'zip', 'doc', etc.)
  })
    .middleware(async ({ req }) => {
      return await validateUserSession();
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Product file upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      return { uploadedBy: metadata.userId };
    }),
  blogImageUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      return await validateUserSession();
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Product file upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
