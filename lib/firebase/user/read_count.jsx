"use client"
import {  collection, getCountFromServer } from "firebase/firestore"
import useSWR from "swr"
import { db } from "../firebase";

export const getUserCount = async ()=>{
    const ref = collection(db,`user`);
    const data = await getCountFromServer(ref)
    return data.data().count
}


export function useUserCount(){
    const {data,error,isLoading} =  useSWR('user_count',(key)=>getUserCount())
    return {data,error,isLoading}
}