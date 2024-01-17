import React from "react";

type Props = {};

export default function Banner({}: Props) {
  return (
    <section className="py-4 flex justify-center items-center">
      <div className="rounded-lg lg:rounded-xl bg-[url('/images/banner.jpeg')] h-[105px] w-[98%] lg:w-[96%]  lg:h-[415px] bg-contain bg-no-repeat "></div>
    </section>
  );
}
