"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, CircularProgress } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { createNewCollection, updateCollection } from '../../../../lib/firebase/collections/write'
import { getcollection } from '../../../../lib/firebase/collections/read_server'
import { useProducts } from '../../../../lib/firebase/products/read'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../../lib/firebase/firebase'
import useSWRSubscription from "swr/subscription"
import { X } from 'lucide-react'






const CategoryForm = () => {

  const [data,setData] = useState(null)
  const [image,setImage] = useState(null)
  const [isLoading,setInLoading] = useState(false)

  const {data:products} = useProducts({pageLimit:10})

  const router = useRouter()


  const searchParams = useSearchParams();

  const id = searchParams.get("id")




  const handelData = (key,val)=>{
    setData((preData)=>{
      return{
        ...(preData ?? {}),
        [key]:val
      }
    })
  }





  const handelCreate = async ()=>{
    setInLoading(true)

    try{
      await createNewCollection({data:data,image:image})
      toast.success("Successfully Created")
      setData(null)
      setImage(null)
    }catch(error){
      console.log(error?.message);
    }
    setInLoading(false)
  }


  const handelUpdate = async ()=>{
    setInLoading(true)

    try{
      await updateCollection({data:data,image:image})
      toast.success("Successfully Updated")
      setData(null)
      setImage(null)
      router.push(`/admin/collections`)
    }catch(error){
      console.log(error?.message);
    }
    setInLoading(false)
  }



  const fetchData = async()=>{
    try{
      const res = await getcollection({id:id})
      if(!res){
        toast.error("Category Not Found!")
      }else {
        setData(res)
      }
    }catch(error){
      toast.error(error?.message)
    }
  }


  useEffect(()=>{
    if(id){
      fetchData(id)

    }
  },[id])








  return (
    <div className=' flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
        <h1 className='font-semibold'>
            {id ? "Update" : "Create"} Collection
        </h1>

        <form className='flex flex-col gap-2'  onSubmit={(e)=>{
          e.preventDefault()
          if(id){
            handelUpdate()
          }else{
            handelCreate()
          }
        }}>



            <div className='flex flex-col gap-1'> 
              <label htmlFor='category-image' className='text-gray-500 text-sm' >
                Image 
                <span className='text-red-500'>
                  *
                </span>
              </label>

              {image && (
                <div className='flex justify-center items-center p-3'>
                  <img className='h-32' src={URL.createObjectURL(image)} alt=" "/>
                </div>
              )}

              <input onChange={(e)=>{
                if(e.target.files.length > 0){
                  setImage(e.target.files[0])
                }
              }
              } type="file" id='category-image' name='category-image'  className='border px-4 py-2 rounded-lg'/>
            </div>



            <div className='flex flex-col gap-1'> 
              <label htmlFor='collecrion_title' className='text-gray-500 text-sm' >
                Title 
                <span className='text-red-500'>
                  *
                </span>
              </label>
              <input type="text" id='collecrion_title' value={data?.title ?? ""} name='collecrion_title' placeholder='Enter Title' className='border px-4 py-2 rounded-lg' onChange={(e)=>handelData('title',e.target.value)}/>
            </div>

            <div className='flex flex-col gap-1'> 
              <label htmlFor='collection_sub_titile' className='text-gray-500 text-sm' >
                Sub Titile 
                <span className='text-red-500'>
                  *
                </span>
              </label>
              <input type="text" id='ollection_sub_titile' value={data?.sub_titile ?? ""} name='ollection_sub_titile' placeholder='Enter sub titile' className='border px-4 py-2 rounded-lg' onChange={(e)=>handelData('sub_titile',e.target.value)}/>
            </div>



              <div className='flex flex-wrap gap-1'>
                {data?.products?.length > 0 && data?.products?.map((productId,index)=>{
                  return <ProducrtCard productId={productId} key={index} setData={setData}/>
                })}
              </div>






            <div className='flex flex-col gap-1'> 
              <label htmlFor='collection_sub_titile' className='text-gray-500 text-sm' >
                Select Products
                <span className='text-red-500'>
                  *
                </span>
              </label>
              <select type="text" id='products' name='products' placeholder='Enter products' 
              className='border px-4 py-2 rounded-lg' onChange={(e)=>{
                setData((preData)=>{
                  let list = [...(preData?.products ?? [])] 
                  list.push(e.target.value)
                  return {
                    ...preData,
                    products:list
                  }
                })
              }} >

                <option value="" > Select Products</option>

                {products?.map((item,index)=>{
                  return <option disabled={data?.products?.includes(item.id)} value={item.id} key={index} > {item.title}</option>
                })}

              </select>
            </div>






            <Button variant='contained' type="submit" color="primary" disabled={isLoading} > 

              {isLoading ? <CircularProgress size="30px" /> : id ? "Update":"Creat"}
              {/* Creat */}
            </Button>


        </form>
    </div>
  )
}

export default CategoryForm








function ProducrtCard({productId,setData}){

  const {data:product} = useProduct({productId:productId})

  // console.log("product",product);
  

  return (
    <div className='bg-blue-500 text-white px-4 py-1 rounded-full text-sm flex flex-row gap-1'>
      <h2>{product?.title}</h2>
      <button onClick={(e)=>{
        e.preventDefault()
        setData((pre)=>{
            let list = [...(pre?.products)];
            list = list?.filter((item)=> item !== productId)
            return{
              ...pre,
              products:list
            }
        })
      }}>
        <X size={15}/>  
      </button>    
    </div>
    )
}




export function useProduct({productId}){
    const { data ,error} = useSWRSubscription(
        ["products",productId],
        ([path,productId],{next})=>{
            const ref = doc(db,`${path}/${productId}`)

            const unsub = onSnapshot(
                ref,
                (snapshot)=>next(null,snapshot.data()),
                (err)=>next(err,null)
            );

            return ()=>unsub();
        }
    );


    return { data : data ,error:error?.message,isLoading:data===undefined };

}