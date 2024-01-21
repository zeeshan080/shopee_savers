import StoreCard from '@/components/StoreCard'
import React from 'react'

type Props = {}

export default function Store({}: Props) {
  return (
    <main className='min-h-screen min-w-screen'>
        <h1 className='text-center p-4 font-bold text-[32px]'>Store Directory</h1>
        <StoreCard/>
    </main>
  )
}