"use client"
import {  collection, count, getAggregateFromServer, sum } from "firebase/firestore"
import useSWR from "swr"
import { db } from "../firebase";

export const getOrderCount = async ()=>{
    const ref = collection(db,`orders`);
    const data = await getAggregateFromServer(ref,{
        totalRevenue: sum('payment.amount'),
        totalOrder:count()
    })

    return data.data()
}


export function useOrderCount(){
    const {data,error,isLoading} = useSWR('ordrs_count',(key)=>getOrderCount())

    if(error){
        console.log(error.message);
        
    }

    return {data,error,isLoading}
}