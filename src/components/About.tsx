import Image from "next/image";
import React from "react";
import about from "../../public/images/about.png";
type Props = {};

export default function About({}: Props) {
  return (
    <section className="flex justify-between items-center my-4 mx-9">
      <div className="w-[60%] p-4 hidden lg:flex">
        <Image src={about} alt={"about"}/>
      </div>
      <div className="p-3 w-full lg:w-[40%] text-center lg:text-left">
        <div className="font-bold text-[36px]">About Shopee Savers</div>
        <div className="text-justify lg:text-left lg:max-w-[85%] mt-4">
          <p>
            Shopee Savers is your ultimate coupon website revolutionizing the
            way you save.
          </p>
          <p>
            Our platform is dedicated to helping savvy shoppers like you unlock
            incredible discounts and deals effortlessly.
          </p>
          <p>
            With a vast collection of verified coupons from your favorite
            brands, Shopee Savers is your go-to destination for maximizing
            savings on everything from fashion and electronics to groceries and
            travel.
          </p>
        </div>
      </div>
    </section>
  );
}
