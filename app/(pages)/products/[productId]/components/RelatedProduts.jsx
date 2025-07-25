import { getProductsByCategory } from '../../../../../lib/firebase/products/read_server'
import {ProductCard} from "../../../../components/ProductsGrid"
import React from 'react'

const RelatedProduts = async ({categoryId}) => {
    console.log('categoryId',categoryId);
    

    const RelatedProduts = await getProductsByCategory({categoryId:categoryId})

  return (
        <div className='w-fill flex justify-center'>
            <div className=" flex flex-col max-w-[900px] p-5 gap-4">
                <h1 className="text-center font-semibold text-lg"> Products </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {RelatedProduts?.map((item)=>{
                        return (
                            <ProductCard product={item} key={item?.id}/>
                        )
                    })}
                </div>
            </div>
        </div>
  )
}

export default RelatedProduts