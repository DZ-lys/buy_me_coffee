import { runQuery } from "@/utils/back_end/qeuryService";
import { UserType } from "@/utils/type";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    //     const createTable = await runQuery<UserType[]>(
    //       `
    //     CREATE TABLE "public"."user" (
    //   "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    //   "email" varchar NOT NULL,
    //   "password" varchar NOT NULL,
    //   "username" varchar NOT NULL,
    //   "createdAt" timestamp NOT NULL,
    //   "updated" timestamp NOT NULL
    // )`
    //     );
    const getUser = `SELECT id, email, password, username FROM "public"."user" `;

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

export async function POST(): Promise<NextResponse> {
  try {
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const email = "test@gmail.com";
    const password = "123456";
    const username = "newUser";

    const createUser = `
          INSERT INTO "public"."user" (email, password, username, "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
        `;

    const values = [email, password, username, createdAt, updatedAt];

    const newUser = await runQuery<UserType[]>(createUser, values);

    return new NextResponse(JSON.stringify({ user: newUser }));
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
