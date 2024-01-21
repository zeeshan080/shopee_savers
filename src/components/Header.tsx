"use client";
import { usePathname } from "next/navigation";
import { notFound } from 'next/navigation'
import Link from "next/link";
import React from "react";
import { Loader2, Menu, Search } from "lucide-react";
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
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const getStore = await fetch(`/api/store?search=${search}`, {
      method: "GET",
      cache: "no-cache",
    });
    setIsLoading(false);
    const store = await getStore.json();
    console.log(store);
    if (store.message.length == 0) {
      window.location.href = `/not-found?search=${search}`;
    }
    window.location.href = `/stores/${store.message[0].id}`;
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
          <form className="relative" onSubmit={onSubmit}>
            {isLoading ? (
              <Loader2 size={19} className="animate-spin absolute top-3 left-3 text-gray-500 " />
            ) : (
              <Search
                size={19}
                className="absolute top-3 left-3 text-gray-500"
              />
            )}
            <Input
              disabled={isLoading}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for your favorite store"
              className="rounded-full pl-9 italic text-gray-900"
            />
          </form>
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
