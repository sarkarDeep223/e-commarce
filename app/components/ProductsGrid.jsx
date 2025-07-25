import { Rating } from "@mui/material"
import Link from "next/link"
import FevoritButton from "./FavoritButoon"
import AuthContextProvider from "../../contexts/AuthContext"
import AddToCartButton from "./CartButton"



export default function ProductsGridView({products}){

    return (
        <section className="w-full flex justify-center">

            <div className=" flex flex-col max-w-[900px] p-5">

                <h1 className="text-center font-semibold text-lg"> Products </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">

                    {products?.map((item)=>{
                        return (
                            <ProductCard product={item} key={item?.id}/>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}




export function ProductCard({product}){
    return (
        <div className=" flex flex-col gap-3  border p-4 rounded-lg" >
            <div className="relative w-full">
                <img className="rounded-lg h-48 w-full object-cover" src={product?.featureImageUrl} alt=""/>
                <div className="absolute top-0 right-0">
                    <AuthContextProvider>
                        <FevoritButton productId={product?.id}/>
                    </AuthContextProvider>
                </div>
            </div>
            <Link href={`/products/${product?.id}`}>
                <h1 className="font-semibold line-clamp-2 text-sm">{product?.title}</h1>
            </Link>

            <div className="text-green-500 text-sm font-semibold">
                <h2>${product?.price}</h2>
            </div>

            <p className="text-xs text-gray-500 line-clamp-2">{product?.short_description}</p>

            <div className="flex gap-3 items-center">
                <Rating size="small" name="rating" defaultValue={2.5} precision={0.5} readOnly/>
                <h1 className="text-xs text-gray-400">(0)</h1>
            </div>

            <div className="flex items-center gap-4">

                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs">
                    Buy Now
                </button>


                <AuthContextProvider>
                    <AddToCartButton productId={product?.id}/>
                </AuthContextProvider>

            </div>
        </div>
    )
}