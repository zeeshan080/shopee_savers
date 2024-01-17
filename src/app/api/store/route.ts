import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { store } from "../../../../drizzle/migrations/schema";
import { db } from "../../../../drizzle/dizzle";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storeID = searchParams.get("id");
  const filter = searchParams.get("filter");

  const rows = await db
    .select()
    .from(store)

  return NextResponse.json({ message: rows });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const rows = await db.insert(store).values(body);
  return NextResponse.json({
    message: rows.rowCount,
    status: 201,
    statusText: "Successfully Created",
  });
}

export async function PUT(request: NextRequest) {
  const { id, storeDetails } = await request.json();
  const rows = await db
    .update(store)
    .set(storeDetails)
    .where(eq(store.storeId, id));
  return NextResponse.json({
    message: rows.rowCount,
    status: 201,
    statusText: "Successfully Updated",
  });
}
