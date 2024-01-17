"use client";
import React, { Suspense } from "react";
import Link from "next/link";

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
  const getCategories = async () => {
    const data = await fetch("/api/category", {
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
  };
  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <main className="p-8">
      <div className="text-center font-bold p-6 text-[32px]">
        All Categories
      </div>
      {Object.keys(categories).map((categoryName, index) => (
        <div key={index}>
          <div className="font-bold text-[22px] mb-3">{categoryName}</div>
          <ul>
            {categories[categoryName].map((subcategory, subIndex) => (
              <li key={subIndex} className="list-disc ml-3 mt-1">
                <Link href={`category/${subcategory.subCategory}`}>
                  {subcategory.subCategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
