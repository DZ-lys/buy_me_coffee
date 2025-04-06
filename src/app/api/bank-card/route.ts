import { runQuery } from "@/utils/back_end/qeuryService";
import { Bank_Card } from "@/utils/types/type";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const getPaymentDetails = `SELECT country, first_name, last_name, card_number, expiry_date, "createdAt", "updatedAt", user_id FROM "bank_card" `;

    const detail = await runQuery(getPaymentDetails);
    if (detail.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ paymentDetail: detail }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      country,
      first_name,
      last_name,
      card_number,
      expiry_date,
      user_id,
    } = await req.json();

    const createdAt = new Date();
    const updatedAt = new Date();

    if (
      !country ||
      !first_name ||
      !last_name ||
      !card_number ||
      !expiry_date ||
      !user_id
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Incoming request:", req.method);

    const createPaymentDetails = `
      INSERT INTO "profile" (country, first_name, last_name, card_number, expiry_date, "createdAt", "updatedAt", user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      country,
      first_name,
      last_name,
      card_number,
      expiry_date,
      createdAt,
      updatedAt,
      user_id,
    ];

    const newDetail = await runQuery<Bank_Card[]>(createPaymentDetails, values);

    return NextResponse.json({ paymentDetail: newDetail });
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
