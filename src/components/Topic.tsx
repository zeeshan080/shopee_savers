"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import { blogType } from "../../drizzle/migrations/schema";

type Props = {};

export default function Topic({}: Props) {
  const [blogData, setBlogData] = React.useState<blogType[]>([
    {
      blogId: 0,
      title: "",
      content: "",
      image: "",
      created_at: "",
      updated_at: "",
    }
  ]);
  const getBlogData = async () => {
    const data = await fetch("/api/blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    if (response.message.length > 0) {
      setBlogData(response.message);
    }
  };
  React.useEffect(() => {
    getBlogData();
  }, []);

  return (
    <main>
      <section>
        <div className="text-center font-bold text-[32px]">Top Topics</div>
        <div className="flex flex-col lg:flex-row m-6 gap-4">
        <div className="w-full lg:w-[40%]">
          <div className=" rounded-xl min-h-[445px] flex justify-center items-center shadow-lg ">
            <Image src={blogData[0].image} alt="" width={500} height={500} />
          </div>
          <div className="font-bold text-[22px] text-center">
            {blogData[0].title}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-3 w-full lg:w-[60%]">
          {blogData.map((blog, index) => {
            if (index > 0) {
              return (
                <div key={blog.blogId}>
                  <div className=" rounded-xl min-h-[200px] flex justify-center items-center shadow-lg ">
                    <Image src={blog.image} alt="" width={300} height={300} />
                  </div>
                  <div className="font-bold text-[18px] text-center">
                    {blog.title}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      </section>
    </main>
  );
}
