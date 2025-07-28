"use client"
import { useSearchParams } from "next/navigation";
import {useAuth} from "../../../contexts/AuthContext"
import {useUser} from "../../../lib/firebase/user/read"
import { useProductsById } from "../../../lib/firebase/products/read";
import { CircularProgress } from "@mui/material";
import Checkout from "./components/Checkout";

export default function Page(){


    const {user} = useAuth()
    const {data} = useUser({uid: user?.uid});


    const searchParam = useSearchParams()
    const type = searchParam.get("type")
    const productId = searchParam.get("productId")


    const productIdList = type === "buynow" ? [productId] : data?.carts?.map((item)=>item?.id)


    const {data:products,error,isLoading} = useProductsById({idsList: productIdList})


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

    if(productIdList?.length === 0){
        return <div>
            <h1>Products not found</h1>
        </div>
    }


    const productList = (type === "buynow") ? [
        {
            id:productId,
            quantity : 1,
            product : products[0]
        }
    ]: data?.carts?.map((item)=>{
        return{
            ...item,
            product: products?.find((e)=>e?.id === item?.id)

        }
    })



    return(
        <main className="p-5 flex flex-col gap-4">
            <h1 className="text-xl"> Checkout </h1>
            <Checkout productList={productList}/>
        </main>
    )
}