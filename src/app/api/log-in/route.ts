import { runQuery } from "@/utils/back_end/qeuryService";
import { UserType } from "@/utils/types/type";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    console.log("req body:", body);

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await runQuery<UserType>(
      `SELECT * FROM "user" WHERE "user".email = $1`,
      [body.email]
    );

    console.log("user body:", user);

    if (!user || user.length === 0) {
      return NextResponse.json(
        { message: "user doesnt exist", error: true },
        { status: 404 }
      );
    }

    const userId = user[0].id;

    const userDetail = await runQuery(
      `SELECT * FROM "user" INNER JOIN "profile" ON "user"."profileId" = "profile".id 
      INNER JOIN "bank_card" ON "user"."bank_cardId" = "bank_card".id
      WHERE "user".id = $1`,
      [userId]
    );

    const fallbackUser = await runQuery(
      `SELECT * FROM "user" WHERE "user".id = $1`,
      [userId]
    );

    const [userResponse] = userDetail.length ? userDetail : fallbackUser;
    return NextResponse.json({ userLog: userResponse });
  } catch (err) {
    console.error("Failed to log in:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to log in" }), {
      status: 500,
    });
  }
}
