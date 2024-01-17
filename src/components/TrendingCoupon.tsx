import React from "react";
import CouponCard from "./CouponCard";

type Props = {};

export default function TrendingCoupon({}: Props) {
  return (
    <main>
      <section className="bg-gray-100 lg:m-6 lg:p-8">
        <div className="text-center font-bold text-[32px]">
          Trending Coupons
        </div>
        <div className="flex flex-col gap-y-5">
          <CouponCard />
          <CouponCard />
          <CouponCard />
        </div>
      </section>
    </main>
  );
}
