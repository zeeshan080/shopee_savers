import Image from "next/image";
import React from "react";

type Props = {
  name: string;
  about: string;
  image: string;
};

export default function StoreHeader({ name,about,image }: Props) {

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div className="mt-8 mb-4 mx-6 py-5 px-6 shadow-lg rounded-xl bg-[#FAFAFA] w-full">
        <div className="flex flex-col lg:flex-row items-center gap-4 p-3">
          <div className="w-full lg:w-[15%]">
            <div className="rounded-full overflow-clip w-40 h-40 shadow-lg bg-gray-100 text-center pt-12">
              <Image src={image} alt={name} width={180} height={180}/>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="font-bold text-[32px]">{name} Coupons</h1>
            <p className="py-2">
              Save big on your {name} purchase with our exclusive coupons and
              deals. The best part is that our coupon includes free shipping.
              That&apos;s right you can save on your purchase and have it delivered
              right to your doorstep without any extra cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
