import React from 'react'

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <main>
        <section className='grid grid-cols-1 lg:grid-cols-2 m-8'>
            <div>Stores</div>
            <div>Coupons</div>
            <div>Category</div>
        </section>
    </main>
  )
}