import { runQuery } from "@/utils/back_end/qeuryService";
import { UserType } from "@/utils/types/type";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const getUser = `SELECT id, email, password, username, "createdAt", "updatedAt" FROM "public"."user" `;

    const user = await runQuery(getUser);
    if (user.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ users: user }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const createUserQuery = `
      INSERT INTO "public"."user" (email, password, username, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [email, password, username, createdAt, updatedAt];
    const newUser = await runQuery<UserType[]>(createUserQuery, values);

    return NextResponse.json({ user: newUser });
  } catch (err) {
    console.error("Failed to insert new user:", err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to insert new user" }),
      {
        status: 500,
      }
    );
  }
}
