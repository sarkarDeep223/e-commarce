"use client"
import { useUser } from '../../../lib/firebase/user/read'
import { useAuth } from '../../../contexts/AuthContext'
import React from 'react'
import { useProduct } from '../../../lib/firebase/products/read'
import { ProductCard } from '../../components/ProductsGrid'

const Page = () => {



  const {user} = useAuth()
  const {data} = useUser({uid:user?.uid})











  return (
        <main className='p-5'>
            <h1>Favorites</h1>
            <div className='p-5 w-full md:nax-w-[900px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-2 '>
              {data?.favorits?.map((productId,index)=>{
                return <ProductIItem productId={productId} key={index}/>
              })}
            </div>
        </main>
  )
}

export default Page



function ProductIItem({productId}){
  const {data : product} = useProduct({productId:productId})
  return <ProductCard product={product}/>
}