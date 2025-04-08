import { runQuery } from "@/utils/back_end/qeuryService";
import { UserType } from "@/utils/types/type";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await runQuery<UserType>(
      `SELECT * FROM "user" WHERE email = $1`,
      [email]
    );

    if (!user || user.length === 0) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 404 }
      );
    }

    const foundUser = user[0];

    console.log("found user:", foundUser);

    if (foundUser.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const userDetail = await runQuery(
      `SELECT * FROM "user"
       LEFT JOIN "profile" ON "user"."profile_id" = "profile"."id"
       LEFT JOIN "bank_card" ON "user"."bank_card_id" = "bank_card"."id"
       WHERE "user"."id" = $1`,
      [foundUser.id]
    );

    const [userResponse] = userDetail.length > 0 ? userDetail : [foundUser];

    console.log("join ids:", userDetail);

    return NextResponse.json({ user: userResponse });
  } catch (err) {
    console.error("Failed to log in:", err);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  }
}
