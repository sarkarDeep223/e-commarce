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
    return <>{error?.message}</>
  }



  return (
        <main className='flex flex-col gap-4 p-5'>
            <h1 className='text-2xl font-semibold'>My Orders</h1>
            {(!orders || orders?.length === 0) && ( <div className='flex flex-col items-center justify-center gap-3 py-52'> 
                <img src="/Empty-amico.png" alt="" />
                <h1> You Have No Order </h1>
            </div>)}


            <div className='flex flex-col gap-3'>
              {orders?.map((item)=>{

                return (
                  <div className='flex flex-col gap-2 bg-blue-50 border rounded-lg p-4'>
                    <div>{item?.paymentMode}</div>
                  </div>
                )

              })}
            </div>




        </main>
  )
}

export default Page