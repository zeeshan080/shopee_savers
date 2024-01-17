"use client";
import React from "react";
import Link from "next/link";
import { Rancho, Jost } from "next/font/google";
import SidebarItem from "./SidebarItem";
import {
  ChevronLeftSquare,
  ChevronRightSquare,
  Coins,
  Layers2,
  Layers3,
  LayoutDashboard,
  MessageCircle,
  StoreIcon,
} from "lucide-react";
type Props = {};
const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
});
const jost = Jost({
  subsets: ["latin"],
  weight: "400",
});

export default function Sidebar({}: Props) {
  const [toggle, setToggle] = React.useState(false);
  return (
    <aside className={`lg:block bg-[#397250] relative min-h-screen`}>
      
      <div className=" p-4 text-white flex gap-4 items-center min-h-[100px]">
        <div className={`${rancho.className} ${toggle && 'hidden'} animate-in text-[32px]`}>
          <Link href={"/dashboard"}>Shopee Savers</Link>
        </div>
        <div>
          {toggle ? (
            <ChevronLeftSquare
              onClick={() => setToggle(!toggle)}
              size={24}
              className="hover:text-[#235020]"
            />
          ) : (
            <ChevronRightSquare
              onClick={() => setToggle(!toggle)}
              size={24}
              className="hover:text-[#235020]"
            />
          )}
        </div>
      </div>

      <section className={`px-2 text-white w-full  ${jost.className}`}>
        <div>
          <ul>
            <li>
              <SidebarItem
                name="DASHBOARD"
                href={"/dashboard"}
                Icon={LayoutDashboard}
                toggle={toggle}
              />
            </li>
            <li>
              <SidebarItem
                name="STORES"
                href={"/dashboard/stores"}
                Icon={StoreIcon}
                toggle={toggle}
              />
            </li>
            <li>
              <SidebarItem
                name="COUPONS"
                href={"/dashboard/coupons"}
                Icon={Coins}
                toggle={toggle}
              />
            </li>
            <li>
              <SidebarItem
                name="CATEGORIES"
                href={"/dashboard/category"}
                Icon={Layers3}
                toggle={toggle}
              />
            </li>
            <li>
              <SidebarItem
                name="SUBCATEGORIES"
                href={"/dashboard/sub-category"}
                Icon={Layers2}
                toggle={toggle}
              />
            </li>
            <li>
              <SidebarItem
                name="BLOGS"
                href={"/dashboard/blog"}
                Icon={MessageCircle}
                toggle={toggle}
              />
            </li>
          </ul>
        </div>
      </section>
     
    </aside>
  );
}
