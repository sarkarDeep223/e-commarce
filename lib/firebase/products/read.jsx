"use client"


import { collection, onSnapshot } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"
import { db } from "../firebase"

export function useProducts(){
    const { data ,error} = useSWRSubscription(
        ["products"],
        ([path],{next})=>{
            const ref = collection(db,path)

            const unsub = onSnapshot(
                ref,
                (snapshot)=>next(null,snapshot.docs.map((snap)=>snap.data())),
                (err)=>next(err,null)
            );

            return ()=>unsub();
        }
    );


    return { data,error:error?.message,isLoading:data===undefined };

}