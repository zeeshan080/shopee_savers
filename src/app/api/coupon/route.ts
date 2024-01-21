import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { coupon, discount, store } from "../../../../drizzle/migrations/schema";
import { db } from "../../../../drizzle/dizzle";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const couponID = searchParams.get("id");
  const filter = searchParams.get("filter");
  const storeName = searchParams.get("storeName");

  if (filter === "trending") {
    const rows = await db
      .select()
      .from(coupon)
      .leftJoin(discount, eq(discount.discountId, coupon.discountId))
      .where(eq(coupon.trending, true));
    return NextResponse.json({ message: rows });
  }
  if (storeName) {
    const rows = await db
      .select({coupon,discount})
      .from(coupon)
      .leftJoin(discount, eq(discount.discountId, coupon.discountId))
      .leftJoin(store, eq(store.storeId, coupon.storeId)) // Join the store table here
      .where(eq(store.name, storeName));
    return NextResponse.json({ message: rows });
  }

  const rows = await db.select().from(coupon);

  return NextResponse.json({ message: rows });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const rows = await db.insert(coupon).values(body);
  return NextResponse.json({
    message: rows.rowCount,
    status: 201,
    statusText: "Successfully Created",
  });
}

export async function PUT(request: NextRequest) {
  const { id, storeDetails } = await request.json();
  const rows = await db
    .update(coupon)
    .set(storeDetails)
    .where(eq(coupon.couponId, id));
  return NextResponse.json({
    message: rows.rowCount,
    status: 201,
    statusText: "Successfully Updated",
  });
}
