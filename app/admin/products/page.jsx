"use client"

import Link from 'next/link'
import React from 'react'
import ListView from "./components/ListView"
import { Button } from '@mui/material'

const Page = () => {
  return (
    <main className='p-6 flex flex-col gap-4'>
        

        <div className='flex justify-between items-center'>
          <h1 className='text-xl'>Products</h1>

          <Link href={`/admin/products/form`}>
            {/* <button className='bg-[#313131] text-sm text-white px-4 rounded-lg'>
              Create
            </button> */}
            <Button variant='contained'> 
              Create
            </Button>
          </Link>
        
        </div>

        <ListView/>


    </main>
  )
}

export default Page