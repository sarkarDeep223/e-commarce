"use client"
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"
import { db } from "../firebase"

export function useAdmins(){
    const { data ,error} = useSWRSubscription(
        ["admins"],
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




export function useAdmin({email}){



    const {data,error} = useSWRSubscription(
        ["admins",email],
        ([path,email],{next})=>{
            const ref = doc(db,`admins/${email}`);
            const unsub = onSnapshot(
                ref,
                (snapshot)=>next(null,snapshot.exists() ? snapshot.data():null),
                (err) => next(err,null)
            );
            return () => unsub();
        }
    )




    return { data,error:error?.message,isLoading:data===undefined }



}







export const deleteAdmin = async ({id})=>{
    if(!id){
        throw new Error("ID is Required");
    }
    await deleteDoc(doc(db,`admins/${id}`))
}