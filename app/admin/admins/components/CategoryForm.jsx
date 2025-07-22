"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, CircularProgress } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
// import { getAdmin } from '../../../../lib/firebase/admin/read_server'
import { createNewAdmin, updateAdmin } from '../../../../lib/firebase/admin/write'
import { getAdmin } from '../../../../lib/firebase/admin/read_server'
const CategoryForm = () => {

  const [data,setData] = useState(null)
  const [image,setImage] = useState(null)
  const [isLoading,setInLoading] = useState(false)

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
      await createNewAdmin({data:data,image:image})
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
      await updateAdmin({data:data,image:image})
      toast.success("Successfully Updated")
      setData(null)
      setImage(null)
      router.push(`/admin/admins`)
    }catch(error){
      console.log(error?.message);
    }
    setInLoading(false)
  }



  const fetchData = async()=>{
    try{
      const res = await getAdmin({id:id})
      if(!res){
        toast.error("Admin Not Found!")
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
            {id ? "Update" : "Create"} Admin
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
              <label htmlFor='admin-image' className='text-gray-500 text-sm' >
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
              } type="file" id='admin-image' name='admin-image'  className='border px-4 py-2 rounded-lg'/>
            </div>



            <div className='flex flex-col gap-1'> 
              <label htmlFor='admin-name' className='text-gray-500 text-sm' >
                Name 
                <span className='text-red-500'>
                  *
                </span>
              </label>
              <input type="text" id='admin-name' value={data?.name ?? ""} name='admin-name' placeholder='Enter Name' className='border px-4 py-2 rounded-lg' onChange={(e)=>handelData('name',e.target.value)}/>
            </div>

            <div className='flex flex-col gap-1'> 
              <label htmlFor='admin-email' className='text-gray-500 text-sm' >
                Email 
                <span className='text-red-500'>
                  *
                </span>
              </label>
              <input type="text" id='admin-email' value={data?.email ?? ""} name='admin-email' placeholder='Enter Name' className='border px-4 py-2 rounded-lg' onChange={(e)=>handelData('email',e.target.value)}/>
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