
"use client"


import { Button, CircularProgress, Tooltip } from '@mui/material'
import { Pencil, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useProducts } from '../../../../lib/firebase/products/read'
import { deleteProduct } from '../../../../lib/firebase/products/write'
import { useState } from 'react'

const ListView = () => {

  const {data: products,error,isLoading} = useProducts()

  if(isLoading){
    return(
      <div>
        <CircularProgress/>
      </div>
    )
  }



  if(error){
    return <div>{error}</div>
  }


  return (
    <div className=' flex-1 flex flex-col   rounded-xl'>
        {/* <h1 className='text-xl'>Categoried</h1> */}
        <table className='border-separate border-spacing-y-3'>
          <thead>
            <tr>
              <th className='border-y bg-white px-3 py-2 border-l rounded-l-lg'>SN</th>
              <th className='border-y bg-white px-3 py-2'>Image</th>
              <th className='border-y bg-white px-3 py-2 text-left'>Name</th>
              <th className='border-y bg-white px-3 py-2 text-left'>Price</th>
              <th className='border-y bg-white px-3 py-2 text-left'>Stock</th>
              <th className='border-y bg-white px-3 py-2   border-r rounded-r-lg'  >Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((item,index)=>{
              return (
                <Row index={index} item={item} key={index}/>
              )
            })}
          </tbody>
        </table>
    </div>
  )
}

export default ListView




function Row({item,index}){

  const [isDeleting,setDeleteing] = useState(false)

  const router = useRouter()



  const handelDelete = async ()=>{

    if(!confirm("Are You Sure?")) return;
    setDeleteing(true)
    try{
      await deleteProduct({id:item?.id})
      toast.success("Successfully Deleted")
    }catch(error){
      toast.error(error?.message)
    }
    setDeleteing(false)
  }


  const handelUpdate = async()=>{
    router.push(`/admin/products/form?id=${item?.id}`)
  }



  return (

    <tr key={index}>
      <td  className='border-y bg-white px-3 py-2 text-center' > {index + 1}</td>
      <td  className='border-y bg-white px-3 py-2'> 
        <div className='flex justify-center'>
          <img className='h-10 w-10 object-cover' src={item?.featureImageUrl} alt="" />
        </div>
      </td>
      <td  className='border-y bg-white px-3 py-2 '>{item?.title}</td>
      <td  className='border-y bg-white px-3 py-2 '>${item?.price}</td>
      <td  className='border-y bg-white px-3 py-2 '>{item?.stock}</td>

      <td  className='border-y bg-white px-3 py-2 border-r rounded-r-lg'>

        <div className='flex gap-2 items-center justify-center'> 
          <Tooltip title="Edit">
            <Button disabled={isDeleting} onClick={handelUpdate}>
              <Pencil size={20}/>
            </Button>
          </Tooltip>

          <Tooltip title="Remove">
            <Button onClick={handelDelete} disabled={isDeleting} >
              {isDeleting ? <CircularProgress size={20} /> : <Trash size={20}/>}
              {/* <CircularProgress size={20}/> */}
            </Button>
          </Tooltip>

        </div>

      </td>
    </tr>


  )
}