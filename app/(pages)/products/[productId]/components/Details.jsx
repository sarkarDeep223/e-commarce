
import { getCategory } from '../../../../../lib/firebase/categories/read_server'
import {getBrand} from "../../../../../lib/firebase/brands/read_server"
import { Button, IconButton } from '@mui/material'
import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const Details = ({product}) => {
  return (
    <div className='flex flex-col gap-3 w-full'>
        <div className='flex gap-3'>
            <Category categoryId={product?.categoryId}/>
            <Brand brandId={product?.brandId}/>
        </div>
        <h1 className='font-semibold text-xl md:text-4xl'>{product?.title}</h1>
        <h2 className='text-gray-600 line-clamp-3 text-sm md:line-clamp-4'>{product?.short_description}</h2>
        <h3 className='text-green-500 font-bold'>${product?.price}</h3>

        <div className='flex items-center gap-5'>
            <Button variant='contained' >
                Buy Now
            </Button>
            <Button variant='contained'>
                Add To Cart
            </Button>
            <IconButton >
                <Heart size={20}/>
            </IconButton>
        </div>



        {product?.content && <div className='flex flex-col gap-2'>
            <h2 className='text-sm font-semibold'>Description</h2>
            <div className='text-gray-600' dangerouslySetInnerHTML={{__html:product?.content}}></div>
        </div>}

    </div>
  )
}

export default Details



async function Category({categoryId}) {
    const category = await getCategory({id:categoryId})
    return (
        <Link href={`/categories/${categoryId}`}>
            <div className='flex items-center gap-3 bg-green-50 px-3 py-1 rounded-full'> 
                <img className='h-5 w-5 ' src={category?.imageUrl} alt="" />
                <h4 className='text-sm font-semibold'>{category?.name}</h4>
            </div>
        </Link>
    )
    
}

async function Brand({brandId}) {
    const brands = await getBrand({id:brandId})
    return (
        <div className='flex items-center gap-3 bg-green-50 px-3 py-1 rounded-full'> 
            
            <img className='h-5 w-5 ' src={brands?.imageUrl} alt="" />
            <h4 className='text-sm font-semibold'>{brands?.name}</h4>

        </div>
    )
    
}