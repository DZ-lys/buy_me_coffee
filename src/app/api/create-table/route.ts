import { runQuery } from "@/utils/back_end/qeuryService";
import { ProfileType } from "@/utils/types/type";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const createTable = await runQuery<ProfileType[]>(
      `CREATE TABLE "public"."profile" (
    "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" varchar NOT NULL,
    "about" varchar NOT NULL,
    "avatarImage" varchar NOT NULL,
    "socialMediaURL" varchar NOT NULL,
    "backgroundImage" varchar NOT NULL,
    "successMessage" varchar NOT NULL,
    "createdAt" timestamp NOT NULL,
    "updatedAt" timestamp NOT NULL
    ))`
    );
    return new NextResponse(JSON.stringify({ profile: createTable }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}
