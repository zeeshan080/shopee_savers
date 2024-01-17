import React from "react";

type Props = {};

export default function Faq({}: Props) {
  return (
    <section>
      <div className="text-center font-bold text-[32px]">FAQ</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 text-center gap-8 my-3 mx-8 p-6">
        <div>
          <h1 className="font-bold text-lg">
            How can I save with Shopee Savers?
          </h1>
          <p>
            We have a vast collection of curated coupon codes to help you save
            big on your favorite brands. Whether you&apos;re a savvy shopper or a
            casual browser, you get to enjoy big savings
          </p>
        </div>
        <div>
          <h1 className="font-bold text-lg">
            How can I save with Shopee Savers?
          </h1>
          <p>
            We have a vast collection of curated coupon codes to help you save
            big on your favorite brands. Whether you&apos;re a savvy shopper or a
            casual browser, you get to enjoy big savings
          </p>
        </div>
        <div>
          <h1 className="font-bold text-lg">
            How can I save with Shopee Savers?
          </h1>
          <p>
            We have a vast collection of curated coupon codes to help you save
            big on your favorite brands. Whether you&apos;re a savvy shopper or a
            casual browser, you get to enjoy big savings
          </p>
        </div>
      </div>
    </section>
  );
}
