"use client"
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"
import { db } from "../firebase"

export function useCategories(){
    const { data ,error} = useSWRSubscription(
        ["categories"],
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




export const deleteCategory = async ({id})=>{
    if(!id){
        throw new Error("ID is Required");
    }
    await deleteDoc(doc(db,`categories/${id}`))
}