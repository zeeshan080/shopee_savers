import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { discount } from "../../../../drizzle/migrations/schema";
import { db } from "../../../../drizzle/dizzle";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storeID = searchParams.get("id");
  const filter = searchParams.get("filter");

  const rows = await db.select().from(discount);

  return NextResponse.json({ message: rows });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const rows = await db.insert(discount).values(body);
  return NextResponse.json({
    message: rows.rowCount,
    status: 201,
    statusText: "Successfully Created",
  });
}

export async function PUT(request: NextRequest) {
  const { id, discountDetails } = await request.json();
  const rows = await db
    .update(discount)
    .set(discountDetails)
    .where(eq(discount.discountId, id));
  return NextResponse.json({
    message: rows.rowCount,
    status: 201,
    statusText: "Successfully Updated",
  });
}
