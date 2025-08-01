
"use client"
import {  collection, getCountFromServer } from "firebase/firestore"
import { db } from "../../firebase"
import useSWR from "swr"

export const getProductsCount = async ()=>{
    const ref = collection(db,`products`);
    const data = await getCountFromServer(ref)
    return data.data().count
}


export function useProductCount(){
    const {data,error,isLoading} =  useSWR('products_count',(key)=>getProductsCount())
    return {data,error,isLoading}
}