"use client"

import React from 'react'
import CategoryForm from "./components/CategoryForm"
import ListView from "./components/ListView"
const page = () => {
  return (
    <main className='p-5 flex flex-col md:flex-row gap-2'>
         <CategoryForm/>
       <ListView/>
    </main>
  )
}

export default  page