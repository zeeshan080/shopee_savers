import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { directory } from "../../../../drizzle/migrations/schema";
import { db } from "../../../../drizzle/dizzle";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const directoryID = searchParams.get("id");
  const filter = searchParams.get("filter");

  const rows = await db.select().from(directory);

  return NextResponse.json({ message: rows });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const rows = await db.insert(directory).values(body);
  return NextResponse.json({
    message: rows.rowCount,
    status: 201,
    statusText: "Successfully Created",
  });
}

export async function PUT(request: NextRequest) {
  const { id, storeDetails } = await request.json();
  const rows = await db
    .update(directory)
    .set(storeDetails)
    .where(eq(directory.directoryId, id));
  return NextResponse.json({
    message: rows.rowCount,
    status: 201,
    statusText: "Successfully Updated",
  });
}
