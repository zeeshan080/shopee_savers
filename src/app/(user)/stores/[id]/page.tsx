"use client";
import React, { Suspense, use, useEffect, useState } from "react";
import { AtSign, Loader2, Plane } from "lucide-react";
import Link from "next/link";
import CouponCard from "@/components/CouponCard";
import StoreHeader from "@/components/StoreHeader";
import { storeType } from "../../../../../drizzle/migrations/schema";

type Props = {
  params: { id: string };
};

export default function SingleStore({ params }: Props) {
  const [singleStore, setsingleStore] = useState<storeType>({} as storeType);
  const [isLoading, setIsLoading] = useState(false);
  const getSingleStore = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/store?id=${params.id}`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await response.json();
    console.log(data);
    setsingleStore(data.message[0]);
    setIsLoading(false);
  };
  useEffect(() => {
    getSingleStore();
  }, []);

  return isLoading ? (
    <div className="flex h-screen w-screen justify-center items-center">
      <Loader2 size={64} className="animate-spin" />
    </div>
  ) : (
    <>
      <main>
        <StoreHeader
          name={singleStore.name}
          about={singleStore.about}
          image={singleStore.logo}
        />
        <section className="flex flex-col-reverse lg:flex-row gap-2 items-start">
          <section className="lg:w-[32%]">
            <div className="shadow-lg bg-[#F5F2F2] rounded-lg m-4 p-3">
              <div className="font-bold text-[28px]">
                About {singleStore.name}
              </div>
              <div>
                <p className="p-3">{singleStore.about}</p>
              </div>
            </div>
            <div className="shadow-lg bg-[#F5F2F2] rounded-lg m-4 p-3">
              <div className="font-bold text-[28px]">
                Helpful links for {singleStore.name}
              </div>
              <div>
                <div className="flex gap-2 items-center my-2">
                  <span>
                    <AtSign size={17} />
                  </span>
                  <span>
                    {singleStore.url && (
                      <Link href={singleStore.url} target="_blank">
                        {singleStore.url}
                      </Link>
                    )}
                  </span>
                </div>
                <div className="flex gap-2 items-center my-2">
                  <span>
                    <Plane size={17} />
                  </span>
                  <span>{singleStore.shipping}</span>
                </div>
              </div>
            </div>
            {/* <Popular grid={"grid-cols-2"} /> */}
          </section>
          <section>
            <CouponCard />
          </section>
        </section>
      </main>
      <div dangerouslySetInnerHTML={{ __html: singleStore.trafficCode }} />
    </>
  );
}
