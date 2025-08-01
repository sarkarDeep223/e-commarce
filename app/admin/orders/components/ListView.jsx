
"use client"


import { CircularProgress, IconButton} from '@mui/material'
import { ArrowLeft, ArrowRight} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAllOrders } from '../../../../lib/firebase/orders/read'

const ListView = () => {

  
  const [pageLimit,setPageLimit] = useState(3)
  const [lastSnapDocList,setLastSnapDocList] = useState([])
  const {data: orders,error,isLoading,lastSnapDoc} = useAllOrders({pageLimit:pageLimit,lastSnapDoc:lastSnapDocList?.length === 0? null : lastSnapDocList[lastSnapDocList?.length -1]})



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
              <th className='border-y bg-white px-3 py-2 text-left'>Customer Name</th>
              <th className='border-y bg-white px-3 py-2 text-left'>Tottal Price</th>
              <th className='border-y bg-white px-3 py-2 text-left'>Total Products</th>
              <th className='border-y bg-white px-3 py-2 text-left'>Payment Mode</th>
              <th className='border-y bg-white px-3 py-2 text-left'>Status</th>
              <th className='border-y bg-white px-3 py-2   border-r rounded-r-lg'  >Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item,index)=>{
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



            <IconButton color="primary" onClick={handelNextPage} disabled={isLoading || orders?.length < pageLimit}>
                <ArrowRight />
            </IconButton>
        </div>

    </div>
  )
}

export default ListView




function Row({item,index}){




  const totalAmount = item?.checkout?.line_items?.reduce((prev,current)=>{
    return prev + ((current?.price_data?.unit_amount / 100) * current.quantity)
  },0)

  return (

    <tr key={index}>
      <td  className='border-y bg-white px-3 py-2 text-center' > {index + 1}</td>

      <td  className='border-y bg-white px-3 py-2 '>{item?.uid} </td>
      <td  className='border-y bg-white px-3 py-2 '>${totalAmount}</td>
      <td  className='border-y bg-white px-3 py-2 '>{item?.checkout?.line_items.length}</td>
      <td  className='border-y bg-white px-3 py-2 '><h3 className='bg-blue-100 text-blue-500 text-xs rounded-lg px-2 py-1 uppercase'>{item?.paymentMode}</h3></td>
      <td  className='border-y bg-white px-3 py-2 '><h3 className='bg-blue-100 text-blue-500 text-xs rounded-lg px-2 py-1 uppercase'>{item?.status ?? "pending"}</h3></td>

      <td  className='border-y bg-white px-3 py-2 border-r rounded-r-lg'>

        {/* <div className='flex gap-2 items-center justify-center'> 
          <Tooltip title="Edit">
            <Button disabled={isDeleting} onClick={handelUpdate}>
              <Pencil size={20}/>
            </Button>
          </Tooltip>

          <Tooltip title="Remove">
            <Button onClick={handelDelete} disabled={isDeleting} >
              {isDeleting ? <CircularProgress size={20} /> : <Trash size={20}/>}
            </Button>
          </Tooltip>

        </div> */}

      </td>
    </tr>


  )
}