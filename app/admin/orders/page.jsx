"use client"

import React from 'react'
import ListView from "./components/ListView"
const Page = () => {
  return (
    <main className='p-6 flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl'>Orders</h1>
        </div>
        <ListView/>
    </main>
  )
}

export default Page