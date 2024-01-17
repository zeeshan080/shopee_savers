"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

type Props = {};

type FavoriteStore = {
  id: number;
  imageData: string;
};
export default async function Favourite({}: Props) {
  let favouriteStores: FavoriteStore[] = [];
  const getFavouriteStores = async () => {
    const response = await fetch(`/api/store/?favorite=true&imageOnly=true`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await response.json();
    favouriteStores.push(...data.message);
  };

  await getFavouriteStores();

  return (
    <section>
      <div className="text-center font-bold text-[32px]">Favourite Stores</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-3">
        {favouriteStores.map((store) => (
          <Link
            href={`/stores/${store.id}`}
            key={store.id}
            className="min-h-[200px] flex justify-center items-center my-3"
          >
            <Image
              className="rounded-xl shadow-2xl hover:scale-105"
              src={store.imageData}
              alt=""
              width={350}
              height={350}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
