"use client"


import { collection, doc, getDoc, limit, onSnapshot, query, startAfter, where } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"
import { db } from "../firebase"

export function useProducts({pageLimit,lastSnapDoc}){
    const { data ,error} = useSWRSubscription(
        ["products",pageLimit,lastSnapDoc],
        ([path,pageLimit,lastSnapDoc],{next})=>{
            const ref = collection(db,path)
            let condition = query(ref,limit(pageLimit ?? 10))
            if(lastSnapDoc){
                condition = query(condition,startAfter(lastSnapDoc))
            }
            const unsub = onSnapshot(
                condition,
                (snapshot)=>next(null,{
                    list: snapshot.docs.length === 0 ? null : snapshot.docs.map((snap)=>snap.data()),
                    lastSnapDoc: snapshot.docs.length === 0 ? null : snapshot.docs[snapshot.docs.length -1]
                }),
                (err)=>next(err,null)
            );

            return ()=>unsub();
        }
    );


    return { data : data?.list, lastSnapDoc: data?.lastSnapDoc ,error:error?.message,isLoading:data===undefined };

}



export function useProduct({productId}){
    const {data,error} = useSWRSubscription(
        ["products",productId],
        ([path],{next})=>{
            const ref = doc(db,`products/${productId}`);
            const unsub = onSnapshot(
                ref,
                (snapshot)=>next(null,snapshot.exists() ? snapshot.data() : null),
                (err) => next(err,null)
            );
            return () => unsub();
        }
    )
    return {data,error: error?.message,isLoading: data === undefined};
}


export function useProductsById({idsList}){
    const { data ,error} = useSWRSubscription(
        ["products",idsList],
        ([path,idsList],{next})=>{
            const ref = collection(db,path)
            let condition = query(ref,where("id","in",idsList))

            const unsub = onSnapshot(
                condition,
                (snapshot)=>next(null,snapshot.docs.length === 0 ? [] : snapshot.docs.map((snap)=>snap.data())),
                (err)=>next(err,null)
            );

            return ()=>unsub();
        }
    );


    return { data : data,error:error?.message,isLoading:data===undefined };

}
