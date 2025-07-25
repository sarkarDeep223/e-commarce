"use client"

import { db } from "../firebase"
import { doc,onSnapshot } from "firebase/firestore"
import useSWRSubscription from "swr/subscription"


export function useUser({uid}){
    const {data,error} = useSWRSubscription(
        ["user",uid],
        ([path],{next})=>{
            const ref = doc(db,`user/${uid}`);
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