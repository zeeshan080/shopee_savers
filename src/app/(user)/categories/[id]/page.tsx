import Coupon from '@/app/(admin)/dashboard/coupons/page'
import Popular from '@/components/Popular'
import React from 'react'

type Props = {
    params: {id: string}
}

export default function SingleCategory({params}: Props) {
  return (
    <main>
    <main>
      <section className="flex gap-2 items-start flex-col-reverse lg:flex-row">
        <section className="w-[32%]">
          <Popular  />
        </section>
        <section>
          <div className="font-bold text-[28px] text-center">Accessories</div>
          <Coupon />
        </section>
      </section>
    </main>
  </main>
  )
}