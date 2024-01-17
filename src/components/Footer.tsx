import React from "react";
import { Rancho } from "next/font/google";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

type Props = {};
const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
});

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#397250] text-white py-4 px-16">
      <div className="text-center p-3">
        <div className={`${rancho.className} text-[48px]`}>Shopee Savers</div>
      </div>
      <div className="grid text-center lg:text-left grid-cols-1 lg:grid-cols-4">
        <div>
          <div className="text-center lg:text-left font-bold text-[26px]">
            Top Categories
          </div>
          <ul className="py-3">
            <li>
              <Link href={""}>Category 1</Link>
            </li>
            <li>
              <Link href={""}>Category 2</Link>
            </li>
            <li>
              <Link href={""}>Category 3</Link>
            </li>
            <li>
              <Link href={""}>Category 4</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-center lg:text-left font-bold text-[26px]">About Us</div>
          <ul className="py-3">
            <li>
              <Link href={""}>Who We Are</Link>
            </li>
            <li>
              <Link href={""}>FAQ</Link>
            </li>
            <li>
              <Link href={""}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-center lg:text-left font-bold text-[26px]">Legal</div>
          <ul className="py-3">
            <li>
              <Link href={""}>Privacy Policy</Link>
            </li>
            <li>
              <Link href={""}>Terms & Condition</Link>
            </li>
          </ul>
        </div>
        <div>
          <div>
            <div className="flex items-center gap-8 p-4">
              <Link href={""}>
                <Facebook size={36}/>
              </Link>
              <Link href={""}>
                <Instagram size={36}/>
              </Link>
              <Link href={""}>
                <Twitter size={36}/>
              </Link>
            </div>
            <p>
              Whenever you use a coupon or click on a link provided on our
              website to make a purchase, ShopeeSavers.com may earn a
              commission. The best part is, this commission comes at no
              additional cost to you! You get to enjoy the savings while
              supporting our mission to bring you the best deals out there.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center italic pt-4">
        © 2023 ShopeeSavers.com. All Rights Reserved.
      </div>
    </footer>
  );
}
