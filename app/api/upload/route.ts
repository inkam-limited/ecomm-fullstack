import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import prisma from "@/lib/db";

// Initialize Supabase client
const supabaseUrl =
  "http://supabasekong-wo0g88g0gc0ocg0c08sw0co8.35.247.166.250.sslip.io";
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract the data from the body
    const { files, caption, productId } = body;

    // Validate input
    if (!files || !caption || !productId) {
      return NextResponse.json(
        { error: "Missing file, caption, or productId" },
        { status: 400 }
      );
    }

    // Ensure files is an array of base64 strings
    if (
      !Array.isArray(files) ||
      !files.every((f: string) => typeof f === "string")
    ) {
      return NextResponse.json(
        { error: "Invalid files format" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    // Upload each file to Supabase storage
    for (let base64File of files) {
      const base64Data = base64File.split(",")[1]; // Strip the base64 prefix
      const buffer = Buffer.from(base64Data, "base64");

      // Generate a unique filename (optional)
      const fileName = `image-${Date.now()}.jpg`; // Change file extension if needed

      const { data, error } = await supabase.storage
        .from("beauty-store")
        .upload(`public/${fileName}`, buffer, {
          contentType: "image/jpeg", // Update this dynamically if necessary
        });

      if (error) {
        console.error("Supabase upload error:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }

      const imageUrl = `${supabaseUrl}/storage/v1/object/public/images/${fileName}`;
      uploadedImages.push(imageUrl);
    }

    // Save uploaded images and other data to Prisma
    const savedData = await prisma.uploadedImage.createMany({
      data: uploadedImages.map((imageUrl) => ({
        imageString: imageUrl,
        caption: caption,
      })),
    });
    console.log(savedData);

    return NextResponse.json({ success: true, savedData });
  } catch (error) {
    console.error("Error in upload handler:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
