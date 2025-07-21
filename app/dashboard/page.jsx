import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <main className='p-10'>
        <h1>dashboard</h1>
        <Link href={"/admin"} >
            Admin Panel
        </Link>
    </main>
  )
}

export default Page