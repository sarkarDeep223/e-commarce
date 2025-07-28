"use client"
import { useUser } from '../../../lib/firebase/user/read'
import { useAuth } from '../../../contexts/AuthContext'
import React, { useState } from 'react'
import { useProduct } from '../../../lib/firebase/products/read'
import { ProductCard } from '../../components/ProductsGrid'
import { CircularProgress, IconButton } from '@mui/material'
import { Minus, Plus, X } from 'lucide-react'
import { updateCarts } from '../../../lib/firebase/user/write'
import Link from 'next/link'

const Page = () => {



  const {user} = useAuth()
  const {data,isLoading} = useUser({uid:user?.uid})




  if(isLoading){
    return(
      <div className='p-10 flex w-full justify-center'>
        <CircularProgress/>
      </div>
    )
  }







  return (
        <main className='p-5'>
            <h1 className='text-2xl font-semibold'>Cart</h1>
            {(!data?.carts || data?.carts?.length === 0) && (
              <div className='flex flex-col gap-5 justify-center items-center h-full w-full py-20'>
                <div className='flex justify-center'>
                  <img className='h-[300px]' src="/Empty-amico.png" alt="" />
                </div>
                {/* <h1 className='text-xl'> Empty!</h1> */}
                <h1>Plese Add Product To Cart</h1>
              </div>
            )}
            <div className='p-5 w-full md:nax-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-5'>
              {data?.carts?.map((item,index)=>{
                return <ProductIItem item={item} key={index}/>
              })}
            </div>
            <div className='flex justify-center'>
              <Link href={`/checkout?type=cart`}>
                <button className='bg-blue-500 px-5 py-3 rounded-lg text-white'>
                  Checkout
                </button>
              </Link>
            </div>
        </main>
  )
}

export default Page



function ProductIItem({item}){

  const {user} = useAuth()
  const {data,isLoading} = useUser({uid:user?.uid})

  const [isremoving,setInRemoving] = useState(false)
  const [isUpdetng,setIsUpdating] = useState(false)

  
  
  const {data : product} = useProduct({productId:item?.id})



  const handelRemove = async()=>{

    if(!confirm("Are You Sure?")) return


    setInRemoving(true)
    try{
      const nelist = data?.carts?.filter((e)=>e?.id != item?.id)
      await updateCarts({list:nelist,uid:user?.uid})
    }catch(error){
        toast.error(error?.message)
    }
    setInRemoving(false)
  }



    const handelUpdate = async(quantity)=>{
    setIsUpdating(true)
    try{
      const nelist = data?.carts?.map((i)=>{
        if(i?.id === item?.id){
          return{
            ...i,
            quantity: parseInt(quantity)
          }
        }else {
          return i;
        }
      })
      await updateCarts({list:nelist,uid:user?.uid})
    }catch(error){
        toast.error(error?.message)
    }
    setIsUpdating(false)
  }



  return (

    <div className='flex gap-3 items-center border px-3 py-3 rounded-xl'>
      <div className='h-14 w-14 p-1'>
        <img className='w-full h-full object-cover rounded-lg' src={product?.featureImageUrl} alt="" />
      </div>

      <div className='flex flex-col gap-1  w-full'>
        <h1>{product?.title}</h1>
        <h1 >
          {product?.price}
        </h1>

        <div className='flex text-sm items-center gap-3'>


          <IconButton onClick={()=>{handelUpdate(item?.quantity - 1)}} disabled={isUpdetng || item?.quantity <= 1}> 
            <Minus size={18}/>
          </IconButton>


          <h2>{item?.quantity}</h2>

          <IconButton onClick={()=>{handelUpdate(item?.quantity + 1)}} disabled={isUpdetng}> 
            <Plus size={18}/>
          </IconButton>



        </div>

      </div>

      <div className='flex gap-3 items-center'>
        <IconButton onClick={handelRemove} disabled={isremoving}> 
          <X/>
        </IconButton>
        

      </div>

    </div>

  )
}