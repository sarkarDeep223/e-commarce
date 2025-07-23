
"use client"


import { Button, CircularProgress, IconButton, Tooltip } from '@mui/material'
import { ArrowLeft, ArrowRight, Pencil, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useProducts } from '../../../../lib/firebase/products/read'
import { deleteProduct } from '../../../../lib/firebase/products/write'
import { useEffect, useState } from 'react'

const ListView = () => {

  
  const [pageLimit,setPageLimit] = useState(3)
  const [lastSnapDocList,setLastSnapDocList] = useState([])
  const {data: products,error,isLoading,lastSnapDoc} = useProducts({pageLimit:pageLimit,lastSnapDoc:lastSnapDocList?.length === 0? null : lastSnapDocList[lastSnapDocList?.length -1]})



  const handelNextPage = () =>{
    let newStack = [...lastSnapDocList]
    newStack.push(lastSnapDoc)
    setLastSnapDocList(newStack)
  }

  const handelPreviusPage = () =>{
    let newStack = [...lastSnapDocList];
    newStack.pop()
    setLastSnapDocList(newStack)
  }

  // const han


  useEffect(()=>{
    setLastSnapDocList([])
    
  },[pageLimit])




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
                <Row index={index + lastSnapDocList?.length * pageLimit} item={item} key={index}/>
              )
            })}
          </tbody>
        </table>

        <div className='flex justify-between text-sm py-3'>
            <IconButton color="primary" onClick={handelPreviusPage}  disabled={isLoading || lastSnapDocList?.length === 0}>
                <ArrowLeft />
            </IconButton>

            <select className='px-5 rounded-xl' name="perpage" id="perpage" value={pageLimit} onChange={(e)=>setPageLimit(e.target.value)}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>



            <IconButton color="primary" onClick={handelNextPage} disabled={isLoading || products?.length < pageLimit}>
                <ArrowRight />
            </IconButton>
        </div>

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
      <td  className='border-y bg-white px-3 py-2 '>{item?.title} {item?.isFeatured === "Yes" && <span className='ml-2 bg-gradient-to-tr from-blue-600 to-indigo-500  text-white text-[10px] rounded px-2 py-1'>Featured</span>}</td>
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