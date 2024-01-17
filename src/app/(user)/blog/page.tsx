"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { blogType } from "../../../../drizzle/migrations/schema";
import Popular from "@/components/Popular";

type Props = {};

export default function Blog({}: Props) {
  const [blogData, setBlogData] = React.useState<blogType[]>([]);
  const getBlogData = async () => {
    const data = await fetch("/api/blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    console.log(response.message);

    setBlogData(response.message);
  };

  React.useEffect(() => {
    getBlogData();
  }, []);

  return (
    <main>
      <section className="flex items-start flex-col-reverse lg:flex-row">
        <aside className="w-[32%]">
          <Popular  />
        </aside>
        <section className="w-[71%] m-3">
          {blogData.map((blog) => (
            <Link
              href={`blog/${blog.blogId}`}
              className="flex flex-col items-start"
              key={blog.blogId}
            >
              <div className="rounded-xl flex justify-center items-center m-4">
                <Image
                  src={blog.image}
                  alt="blog"
                  width={400}
                  height={400}
                  className="rounded-xl"
                />
              </div>
              <div className="text-[22px] font-bold ml-5 mb-3">
                {blog.title}
              </div>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
