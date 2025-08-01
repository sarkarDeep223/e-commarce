"use client"


import React from 'react'
import { useOrders } from '../../../lib/firebase/orders/read'
import { useAuth } from '../../../contexts/AuthContext'
import { CircularProgress } from '@mui/material'

const Page = () => {
  
  const {user} = useAuth();

  const {data:orders,error,isLoading} = useOrders({uid:user?.uid})
  

  if(isLoading){
    return (
      <div className='flex justify-center py-48'>
        <CircularProgress/>
      </div>
    )
  }


  if(error){
    return <>{error}</>
  }



  return (
        <main className='flex flex-col gap-4 p-5'>
            <h1 className='text-2xl font-semibold'>My Orders</h1>
            {(!orders || orders?.length === 0) && ( <div className='flex flex-col items-center justify-center gap-3 py-52'> 
                <img src="/Empty-amico.png" alt="" />
                <h1> You Have No Order </h1>
            </div>)}


            <div className='flex flex-col gap-3'>
              {orders?.map((item,orderIndex)=>{
                const totalAmount = item?.checkout?.line_items?.reduce((prev,current)=>{
                  return prev + ((current?.price_data?.unit_amount / 100) * current.quantity)
                },0)
                return (
                  <div key={item.id} className='flex flex-col gap-2  border rounded-lg p-4'>
                    <div className='flex flex-col gap-4'>

                    <div className='flex gap-3'>
                    
                      <h3 className=''>{orderIndex +1}</h3>
                    
                      <h3 className='text-green-400'>{totalAmount}</h3>
                      <h3 className='bg-blue-100 text-blue-500 text-xs rounded-lg px-2 py-1 uppercase'>{item?.paymentMode}</h3>
                      <h3 className='bg-blue-100 text-blue-500 text-xs rounded-lg px-2 py-1 uppercase'>{item?.status ?? "pending"}</h3>


                    </div>
                      <h4 className='text-gray-600 text-xs'>
                        {item?.timestampCreate?.toDate()?.toString()}
                      </h4>
                    </div>
                    
                    <div className=''>
                      {
                        item?.checkout?.line_items?.map((product,index)=>{
                          return (

                            <div className='flex gap-2 items-center' key={index}>
                                <img className='h-8 w-8 rounded-lg' src={product?.price_data?.product_data?.images?.[0]} alt="" />
                                <div>
                                  <h1>{product?.price_data?.product_data?.name}</h1>
                                  <h1 className='text-gray-500 text-xs'>$ {product?.price_data?.unit_amount/100} <span> X</span> <span>{product?.quantity}</span></h1>
                                </div>
                            </div>
                          )
                        })
                      }

                    </div>
                  </div>
                )

              })}
            </div>




        </main>
  )
}

export default Page