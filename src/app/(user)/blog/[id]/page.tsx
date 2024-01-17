"use client";
import Image from "next/image";
import React from "react";
import { blogType } from "../../../../../drizzle/migrations/schema";
import Popular from "@/components/Popular";

type Props = {
  params: { id: string };
};

export default function SingleBlog({ params }: Props) {
  const [blogData, setBlogData] = React.useState<blogType>();
  const getBlogData = async () => {
    const data = await fetch(`/api/blog?id=${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    console.log(response.message[0]);

    setBlogData(response.message[0]);
  };

  React.useEffect(() => {
    getBlogData();
  }, []);
  return (
    <main>
      <section className="flex items-start flex-col-reverse lg:flex-row text-center lg:text-center">
        <aside className="w-[32%]">
          <Popular />
        </aside>
        <section className="w-[71%] m-3">
          {blogData && (
            <article className="">
              <div className="rounded-xl bg-gray-400 min-h-[400px] flex justify-center items-center m-4">
                <Image
                  className="rounded-xl shadow-xl"
                  src={blogData.image}
                  width={350}
                  height={350}
                  alt={String(blogData.blogId)}
                />
              </div>
              <div className="text-[22px] font-bold ml-5 mb-3">
                {blogData.title}
              </div>
              <div className="ml-5">
                <p>{blogData.content}</p>
              </div>
            </article>
          )}
        </section>
      </section>
    </main>
  );
}
