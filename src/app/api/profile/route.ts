import { runQuery } from "@/utils/back_end/qeuryService";
import { ProfileType } from "@/utils/types/type";
import { profile } from "console";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const getProfile = `SELECT name, about, avatarImage, socialMediaURL, createdAt, updatedAt FROM "public"."profile" `;

    const profile = await runQuery(getProfile);
    if (profile.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ profileInfo: profile }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { name, about, avatarImage, socialMediaURL } = await req.json();

    if (!name || !about || !avatarImage || !socialMediaURL) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const createProfile = `
      INSERT INTO "public"."profile" (name, about, avatarImage, socialMediaURL, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      name,
      about,
      avatarImage,
      socialMediaURL,
      createdAt,
      updatedAt,
    ];
    const newProfile = await runQuery<ProfileType[]>(createProfile, values);

    return NextResponse.json({ profile: newProfile });
  } catch (err) {
    console.error("Failed to create new profile:", err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create new profile" }),
      {
        status: 500,
      }
    );
  }
}
