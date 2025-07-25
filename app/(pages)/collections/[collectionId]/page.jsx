import React from 'react'
import {getcollection} from "../../../../lib/firebase/collections/read_server"
import {ProductCard} from "../../../components/ProductsGrid"
import { getProduct } from '../../../../lib/firebase/products/read_server';
const Page = async ({params}) => {
    const {collectionId} = await params;
    const collection = await getcollection({id:collectionId})


  return (
        <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
            <div className=" flex flex-col gap-6 max-w-[900px] p-5">

                <div className='w-full flex justify-center'>
                    <img className='h-[110px]' src={collection?.imageUrl} alt="" />
                </div>

                <h1 className="text-center font-semibold text-4xl"> {collection.title} </h1>
                <h2 className='text-center text-gray-500'>{collection.sub_titile}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-self-center justify-center items-center gap-4 md:gap-5">
                    {collection?.products.map((item)=>{
                        return (
                            <Product productId={item} key={item}/>
                        )
                    })}
                </div>
            </div>
        </main>
  )
}

export default Page



async function Product({productId}){


    const product = await getProduct({id:productId})

    console.log("product",product);
    


    return <ProductCard product={product} />
}