import { NextRequest, NextResponse } from "next/server";
import { eq,ilike,isNotNull } from "drizzle-orm";
import { directory, store } from "../../../../drizzle/migrations/schema";
import { db } from "../../../../drizzle/dizzle";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storeID = searchParams.get("id");
  const search = searchParams.get("search");
  const filter = searchParams.get("filter");

  if (storeID) {
    const rows = await db
      .select()
      .from(store)
      .where(eq(store.storeId, Number(storeID)));
    return NextResponse.json({ message: rows });
  }
  if (search) {  
    const rows = await db
      .select({id:store.storeId})
      .from(store)
      .where(ilike(store.name, `%${search}%`));
    return NextResponse.json({ message: rows });
  }
  if (filter === "favorite") {
    const rows = await db
      .select()
      .from(store)
      .where(isNotNull(store.favoriteImage));
    return NextResponse.json({ message: rows });
  }
  if (filter === "directory") {
    const rows = await db
    .select({
      storeId: store.storeId,
      name: store.name,
      directoryId: directory.directoryId,
      directoryName: directory.name,
    })
    .from(store)
    .innerJoin(directory, eq(directory.directoryId, store.directoryId))
    .groupBy(directory.directoryId,store.storeId);
  return NextResponse.json({ message: rows });
  }
  const rows = await db.select().from(store);

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
