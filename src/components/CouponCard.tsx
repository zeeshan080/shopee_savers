"use client";
import React, { use } from "react";
import { Button } from "./ui/button";
import { couponType, discountType } from "../../drizzle/migrations/schema";
import { Clock } from "lucide-react";
import Link from "next/link";

type Props = {
  couponData: {
    coupon: couponType;
    discount: discountType;
  };
};

export default function CouponCard({ couponData }: Props) {
  const { coupon, discount } = couponData;

  return (
    <div className="my-4 mx-3 py-5 px-6 shadow-lg rounded-md bg-white">
      <div className="flex flex-col gap-5 lg:flex-row items-center justify-center text-center lg:text-left lg:justify-between p-3">
        <Link
          href={`${coupon.link}`}
          target="_blank"
          className="w-full flex justify-center items-center lg:w-[20%]"
        >
          <div className="rounded-full border-[2px] border-[#398250] w-20 h-20  lg:w-36 lg:h-36 shadow-md bg-gray-100 text-center lg:pt-12 overflow-clip">
            <div className="">
              {discount.name === "Percent" ? (
                <span className="lg:pt-0 lg:leading-9 pt-4 text-[22px] lg:text-[38px] font-bold">
                  {coupon.discount_number}%
                </span>
              ) : discount.name === "Dollar" ? (
                <span className="lg:pt-0 lg:leading-9 pt-4 text-[22px] lg:text-[38px] font-bold">
                  ${coupon.discount_number}
                </span>
              ) : discount.name === "Free Shipping" ? (
                <span className="leading-4 text-[16px] lg:text-[22px]">
                  <span className="font-bold">FREE</span> SHIPPING
                </span>
              ) : discount.name === "Get Deal" ? (
                <span className="leading-9 text-[16px] lg:text-[22px] font-bold">
                  GET DEAL
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="bg-[#398250] h-full text-[18px] lg:mt-4 text-white">
              {discount.name === "Percent" || discount.name === "Dollar"
                ? "OFF"
                : `SALE`}
            </div>
          </div>
        </Link>
        <div className="w-full lg:w-[80%]">
          <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
            <div>
              {coupon.exclusive && (
                <div className="bg-[#821a1a] py-1 px-2 rounded-sm">
                  <span className="text-white text-[13px] tracking-wider">
                    {coupon.exclusive && "EXCLUSIVE"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <span>
                <Clock size={18} />
              </span>
              <span>{coupon.expire_date}</span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center p-4">
            <div className="w-full lg:w-[85%]">
              <Link href={`${coupon.link}`} target="_blank">
                <h1 className="font-bold text-[18px] lg:text-[26px]">
                  {discount.name === "Percent"
                    ? `${coupon.discount_number}% OFF on any Order`
                    : discount.name === "Dollar"
                    ? `$${coupon.discount_number} OFF on any Order`
                    : discount.name === "Free Shipping"
                    ? `Free Shipping on any Order`
                    : discount.name === "Get Deal"
                    ? `Upto ${coupon.discount_number} Off flash sale`
                    : ""}
                </h1>
              </Link>
              <p className="text-[14px] lg:text-[16px] py-2">
                {coupon.description}
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div>
                  <span>Used:</span>
                  <span>{coupon.used_times}</span>
                </div>
                <div className="font-bold">Verified</div>
              </div>
            </div>
            <div className="lg:w-[15%] ">
              {discount.name === "Percent" || discount.name === "Dollar" ? (
                <div className="relative border-[1px] border-gray-400 rounded-md">
                  <div className="font-bold text-[21px] py-2 tracking-wide overflow-clip">
                    {coupon.name}
                  </div>
                  <Button
                    asChild
                    className="min-h-12 rounded-md absolute top-0 left-[-30px] z-10"
                  >
                    <Link href={`${coupon.link}`} target="_blank">
                      Get Coupon
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button asChild className="min-h-12 rounded-md w-full">
                  <Link href={`${coupon.link}`} target="_blank">
                    Get Deal
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
