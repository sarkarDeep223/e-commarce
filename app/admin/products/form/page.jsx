"use client"

import React, { useEffect, useState } from 'react'
import BasicDetails from "./components/BasicDetails"
import Images from "./components/Images"
import Description from "./components/Description"
import { Button, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'

import {getProduct} from "../../../../lib/firebase/products/read_server"

import {createNewProduct, updateProducts} from "../../../../lib/firebase/products/write"
import { useRouter, useSearchParams } from 'next/navigation'


const Page = () => {

    const [data,setData] = useState(null)
    const [featureImage,setFeatureImage] = useState(null)
    const [imageList,setImageList] = useState([])

    const [isLoading,setIsLoading] = useState(false)



      const router = useRouter()
    
    
      const searchParams = useSearchParams();
    
      const id = searchParams.get("id")




    const handelData = (key, value)=>{
        setData((prevData)=>{
            return {
                ...(prevData ?? {}),
                [key]:value
            }
        })
    }


    const handelSubmit = async () =>{
        setIsLoading(true)
        try{
            await createNewProduct({data:data,featureImage:featureImage,imageList:imageList}) 
            setData(null)
            setFeatureImage(null)
            setImageList([])
            toast.success("Product is successfully created!")
        }catch (error){
            console.log(error.message);
            toast.error(error.message)
        }
        setIsLoading(false)
    }



    const handelUpdate = async ()=>{
        setIsLoading(true)

        try{
        await updateProducts({data:data,featureImage:featureImage,imageList:imageList})
        setData(null)
        setFeatureImage(null)
        setImageList([])
        toast.success("Product is successfully Updated!")
        router.push(`/admin/products`)
        }catch(error){
        console.log(error?.message);
        toast.error(error.message)
        }
        setIsLoading(false)
    }






    const fetchData = async()=>{
    try{
      const res = await getProduct({id:id})
      if(!res){
        toast.error("Category Not Found!")
      }else {
        setData(res)
        // setFeatureImage(res?.featureImageUrl)
        // setImageList(res?.imageUrlList)
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
    <form className='p-5 flex flex-col gap-5' onSubmit={(e)=>{
        e.preventDefault()
        if(id){
            handelUpdate()
        }else{
            handelSubmit()
        }
    }}>
        <div className='flex justify-between w-full items-center'>
            <h1 className='font-semibold'>{id ? "Update" : "Create New" }Products</h1>
            <Button type='submit' variant='contained' disabled={isLoading} >{isLoading ? <CircularProgress size="30px" /> : id? "Update" : "Create"} </Button>
        </div>

        <div className='flex flex-col md:flex-row  gap-3'>
            <div className='flex flex-1'>
                <BasicDetails data={data} handelData={handelData}/>

            </div>
            <div className='flex flex-1 flex-col gap-5'>
                <Images data={data} featureImage={featureImage} setFeatureImage={setFeatureImage} imageList={imageList} setImageList={setImageList}/>
                <Description data={data} handelData={handelData}/>
            </div>
        </div>




    </form>
  )
}

export default Page



