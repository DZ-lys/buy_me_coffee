import { runQuery } from "@/utils/back_end/qeuryService";
import { NextResponse } from "next/server";
import { Profile_Type } from "@/utils/types/type";

export async function GET(): Promise<NextResponse> {
  try {
    const getProfile = `SELECT name, about, avatar_image, social_media_url, "createdAt", "updatedAt" FROM "profile" `;

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
    const { name, about, avatar_image, social_media_url, userid } =
      await req.json();

    const createdAt = new Date();
    const updatedAt = new Date();

    if (!name || !about || !avatar_image || !social_media_url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Incoming request:", req.method);

    const createProfile = `
      INSERT INTO "profile" (name, about, avatar_image, social_media_url, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      name,
      about,
      avatar_image,
      social_media_url,
      createdAt,
      updatedAt,
    ];

    console.log("user id:", userid);

    const newProfile = await runQuery<Profile_Type>(createProfile, values);

    const newProfileId = newProfile[0].id;

    const profileId = await runQuery(
      `UPDATE "user" SET "profile_id" = $1 WHERE "id" = $2`,
      [newProfileId, userid]
    );

    return NextResponse.json({ profile: profileId });
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
