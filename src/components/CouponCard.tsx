import React from "react";
import { Button } from "./ui/button";

type Props = {};

export default function CouponCard({}: Props) {
  return (
    <div className="my-4 mx-3 lg:mx-12 py-5 px-6 shadow-lg rounded-md bg-white">
      <div className="text-right">
        <span>Expires:</span>
        <span>12/31/2024</span>
      </div>
      <div className="flex flex-col gap-5 lg:flex-row items-center justify-center text-center lg:text-left lg:justify-between p-3">
        <div className="w-full flex justify-center items-center lg:w-[17%]">
          <div className="rounded-full border-[2px] border-[#398250] w-20 h-20  lg:w-36 lg:h-36 shadow-md bg-gray-100 text-center lg:pt-12 overflow-clip">
            <div className="text-[22px] lg:text-[38px] font-bold pt-4 lg:pt-0 lg:leading-9">
              10%
            </div>
            <div className="bg-[#398250] h-full text-[18px] lg:mt-4 text-white">
              OFF
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[60%]">
          <h1 className="font-bold text-[18px] lg:text-[26px]">
            10% Off Coupon on any Order
          </h1>
          <p className="text-[14px] lg:text-[16px] py-2">
            Save $30 Off Your Entire Purchase Plus Free Shipping. Click to Get
            Code and Enjoy Your VEVOR Discount!
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <div>
              <span>Used:</span>
              <span>512</span>
            </div>
            <div className="font-bold">Verified</div>
          </div>
        </div>
        <div className="lg:w-[12%] relative border-[1px] border-gray-400 rounded-md">
          <div className="font-bold text-[21px] py-2 tracking-wide">
            SAVE2024
          </div>
          <Button className="min-h-12 rounded-md absolute top-0 left-[-15px] z-10">
            Get Coupon
          </Button>
        </div>
      </div>
    </div>
  );
}
