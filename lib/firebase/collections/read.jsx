"use client"
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"
import { db } from "../firebase"

export function useCollections(){
    const { data ,error} = useSWRSubscription(
        ["collections"],
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




export const deleteCollections = async ({id})=>{
    if(!id){
        throw new Error("ID is Required");
    }
    await deleteDoc(doc(db,`collections/${id}`))
}