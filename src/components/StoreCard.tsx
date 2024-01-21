"use client";
import Link from "next/link";
import React, { Suspense } from "react";

type Props = {};

type StoreCardProps = {
  storeId: number;
  name: string;
  directoryId: number;
  directoryName: string;
};

type StoreCardPropsGrouped = {
  [key: string]: StoreCardProps[];
};

export default function StoreCard({}: Props) {
  const [stores, setStores] = React.useState<StoreCardPropsGrouped>({});
  const getStore = async () => {
    const data = await fetch("/api/store?filter=directory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    const storeData = response.message;
    const storesByName: { [key: string]: StoreCardProps[] } = {};

    // Grouping stores by directoryName
    storeData.forEach((store: StoreCardProps) => {
      const key = store.directoryName;
      if (!storesByName[key]) {
        storesByName[key] = [];
      }
      storesByName[key].push(store);
    });

    // Displaying stores by directoryId
    console.log("Stores grouped by directoryId:");
    console.log(storesByName);

    setStores(storesByName);
  };
  React.useEffect(() => {
    getStore();
  }, []);
  return (
    <main>
      {Object.keys(stores).map((directoryName) => (
        <section
          key={directoryName}
          className="shadow-lg bg-gray-200 rounded-md my-5 mx-9 p-6"
        >
          <div className="mb-3 font-bold text-[24px] text-center">
            {directoryName}
          </div>
          {stores[directoryName].map((store) => (
            <div
              className="grid grid-cols-2 lg:grid-cols-7 gap-4"
              key={store.storeId}
            >
              <ul className="py-2 px-3">
                <li className="list-disc" key={store.storeId}>
                  <Link href={`/stores/${store.storeId}`}>{store.name}</Link>
                </li>
              </ul>
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
