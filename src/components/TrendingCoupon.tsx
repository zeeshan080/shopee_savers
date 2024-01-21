"use client";
import React from "react";
import CouponCard from "./CouponCard";
import { couponType, discountType } from "../../drizzle/migrations/schema";

type Props = {};

export default function TrendingCoupon({}: Props) {
  const [coupon, setCoupon] = React.useState<
    { coupon: couponType; discount: discountType }[]
  >([]);

  const getCoupon = async () => {
    const response = await fetch(`/api/coupon/?filter=trending`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await response.json();
    setCoupon(data.message);
  };

  React.useEffect(() => {
    getCoupon();
  }, []);
  return (
    <main>
      <section className="bg-gray-100 lg:m-6 lg:p-8">
        <div className="text-center font-bold text-[32px]">
          Trending Coupons
        </div>
        <div className="flex flex-col gap-y-5">
          {coupon.map((coupon) => (
            <CouponCard key={coupon.coupon.couponId} couponData={coupon} />
          ))}
        </div>
      </section>
    </main>
  );
}
