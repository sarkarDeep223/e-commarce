"use client"
import { collection, limit, onSnapshot, onSnapshotResume, orderBy, query, startAfter, where } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"
import { db } from "../firebase"

export function useOrders({uid}){
    const { data ,error} = useSWRSubscription(
        ["orders",uid],
        ([path,uid],{next})=>{
            const ref = query(collection(db,path),where('uid',"==",uid),orderBy("timestampCreate","desc"))
            const unsub = onSnapshot(
                ref,
                (snapshot)=>next(null,snapshot.docs.map((snap)=>snap.data())),
                (err)=>next(err,null)
            );
            return ()=>unsub();
        }
    );
    if(error){
        console.log(error?.message);
    }
    return { data,error:error?.message,isLoading:data===undefined };
}






export function useAllOrders({pageLimit,lastSnapDoc}){
    const { data ,error} = useSWRSubscription(
        ["orders",pageLimit,lastSnapDoc],
        ([path,pageLimit,lastSnapDoc],{next})=>{
            const ref = collection(db,path)
            let condition = query(ref,limit(pageLimit ?? 10),orderBy("timestampCreate","desc"))
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
    if(error){
        console.log(error?.message); 
    }
    return { data : data?.list, lastSnapDoc: data?.lastSnapDoc ,error:error?.message,isLoading:data===undefined };
}










