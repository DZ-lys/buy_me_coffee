import { runQuery } from "@/utils/back_end/qeuryService";
import { User_Type } from "@/utils/types/type";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();

    if (!email && !password) {
      return new NextResponse(JSON.stringify({ message: "Error in login" }), {
        status: 401,
      });
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await runQuery<User_Type>(
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

    if (foundUser.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const userDetail = await runQuery(
      `SELECT u.id as userId, u.email, u.password, u.username, 
      p.id as profileId, p.name, p.about, p.avatar_image, p.social_media_url, 
      b.id as bankCardId, b.country, b.first_name, b.last_name, b.card_number, b.expiry_date, b.cvc
      FROM "user" as u
      LEFT JOIN "profile" as p ON u."profile_id" = p."id"
      LEFT JOIN "bank_card" as b ON u."bank_card_id" = b."id"
      WHERE u."id" = $1`,
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
