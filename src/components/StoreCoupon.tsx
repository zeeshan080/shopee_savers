"use client";
import React from "react";
import CouponCard from "./CouponCard";
import {
  couponType,
  discountType,
  storeType,
} from "../../drizzle/migrations/schema";

type Props = {
  name: string;
};

export default function StoreCoupon({ name }: Props) {
  const [coupon, setCoupon] = React.useState<
    { coupon: couponType; discount: discountType }[]
  >([]);

  const getCoupon = async () => {
    const response = await fetch(`/api/coupon?storeName=${name}`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await response.json();
    console.log(data.message);

    setCoupon(data.message);
  };

  React.useEffect(() => {
    getCoupon();
  }, []);
  return (
    <main>
      <section className="bg-gray-100 lg:m-6">
        <div className="text-center font-bold text-[32px]">Store Coupons</div>
        <div className="flex flex-col gap-y-5">
          {coupon &&
            coupon.map((coupon, index) => (
              <CouponCard key={index} couponData={coupon} />
            ))}
        </div>
      </section>
    </main>
  );
}
