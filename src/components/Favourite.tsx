"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { storeFormSchemaType } from "../../drizzle/migrations/schema";
import { ScrollArea } from "./ui/scroll-area";

type Props = {};

export default  function Favourite({}: Props) {
  const [favouriteStores,setFavouriteStores] = useState<storeFormSchemaType[]>([]);
  const getFavouriteStores = async () => {
    const response = await fetch(`/api/store/?filter=favorite`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await response.json();
    setFavouriteStores(data.message);
  };

  useEffect(() => {
   getFavouriteStores();
  }, []);

  return (
    <section>
      <div className="text-center font-bold text-[32px]">Favourite Stores</div>
      <ScrollArea aria-orientation="vertical">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-3">
          {favouriteStores.map((store) => (
            <Link
              href={`/stores/${store.storeId}`}
              key={store.storeId}
              className="min-h-[200px] flex justify-center items-center my-3"
            >
              <Image
                className="rounded-md shadow-2xl hover:scale-105"
                src={store.favoriteImage ?? ""}
                alt=""
                width={350}
                height={350}
              />
            </Link>
          ))}
        </div>
      </ScrollArea>
      
    </section>
  );
}
