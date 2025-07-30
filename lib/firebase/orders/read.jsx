"use client"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"
import { db } from "../firebase"

export function useOrders({uid}){
    const { data ,error} = useSWRSubscription(
        ["orders",uid],
        ([path,uid],{next})=>{
            const ref = query(collection(db,path),where('uid',"==",uid))
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