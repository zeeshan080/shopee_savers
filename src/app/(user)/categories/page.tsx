"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type Props = {};

type Category = {
  categoryId: number;
  name: string;
  subCategory: string;
};
type StoreCardPropsGrouped = {
  [key: string]: Category[];
};

export default function Categories({}: Props) {
  const [categories, setCategories] = React.useState<StoreCardPropsGrouped>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const getCategories = async () => {
    setLoading(true);
    const data = await fetch("/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    const categories = response.message;
    const subCategoriesByName: { [key: string]: Category[] } = {};

    categories.forEach((item: Category) => {
      const { name, subCategory } = item;
      if (!subCategoriesByName[name]) {
        subCategoriesByName[name] = [];
      }
      const found = subCategoriesByName[name].find(
        (category) => category.subCategory === subCategory
      );
      if (!found) {
        subCategoriesByName[name].push(item);
      }
    });
    setCategories(subCategoriesByName);
    setLoading(false);
  };
  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <main className="p-4 min-h-screen min-w-screen">
      {
        loading? 
        (<div className="flex justify-center items-center w-full h-full"><Loader2 size={58} className="animate-spin "/></div>) :
        (<>
          <div className="text-center font-bold p-6 text-[32px]">
            All Categories
          </div>
          {Object.keys(categories).map((categoryName, index) => (
            <div key={index}>
              <div className="font-bold text-[22px] mb-3">{categoryName}</div>
              <ul>
                {categories[categoryName].map((subcategory, subIndex) => (
                  <li key={subIndex} className="list-disc ml-3 mt-1">
                    <Link href={`category/${subcategory.categoryId}`}>
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </>)
      }
    </main>
  );
}
