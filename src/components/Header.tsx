"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Menu, Search } from "lucide-react";
import { Rancho } from "next/font/google";
import { Input } from "./ui/input";

type Props = {};
const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
});

export default function Header({}: Props) {
  const path = usePathname();
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <header className="flex flex-col lg:flex-row items-start justify-between lg:items-center p-3 bg-[#397250] text-white">
      <div className=" px-3 w-full lg:w-[45%]">
        <div className={`${rancho.className} text-[26px] lg:text-[36px]`}>
          <Link href={"/"}>Shopee Savers</Link>
        </div>
      </div>
      <div className="flex justify-end items-center gap-6 w-full lg:w-[55%]">
        <nav className="hidden lg:flex lg:w-[55%]">
          <ul className="flex gap-6 items-center font-semibold">
            <li>
              <Link
                href="/stores"
                className={path == "/stores" ? "text-[#FC0404]" : ""}
              >
                STORES
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={path == "/categories" ? "text-[#FC0404]" : ""}
              >
                CATEGORIES
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={path == "/blog" ? "text-[#FC0404]" : ""}
              >
                BLOG
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden lg:flex w-[45%]">
          <div className="relative">
            <Search size={19} className="absolute top-3 left-3 text-gray-500" />
            <Input
              placeholder="Search for your favorite store"
              className="rounded-full pl-9 italic text-gray-900"
            />
          </div>
        </div>

        {/* Burger Menu */}
        <div className="absolute top-5 lg:hidden">
          <Menu size={24} onClick={toggleMenu} className="mx-2" />
        </div>
      </div>
      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden w-full mt-3">
          <ul className="flex flex-col items-start gap-3">
            <nav className="w-full mt-8 ml-4 lg:ml-0 lg:mt-0 lg:w-[55%]">
              <ul className=" flex flex-col lg:flex-row gap-6 items-start lg:items-center font-semibold">
                <li>
                  <Link
                    href="/stores"
                    className={path == "/stores" ? "text-[#FC0404]" : ""}
                  >
                    STORES
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className={path == "/categories" ? "text-[#FC0404]" : ""}
                  >
                    CATEGORIES
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className={path == "/blog" ? "text-[#FC0404]" : ""}
                  >
                    BLOG
                  </Link>
                </li>
              </ul>
            </nav>
          </ul>
        </div>
      )}
    </header>
  );
}
