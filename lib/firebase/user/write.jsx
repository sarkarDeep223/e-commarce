import { doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../firebase"







export const creatUser = async ({uid,user})=>{
    await setDoc(doc(db,`user/${uid}`),{
        displayName:user?.displayName,
        timestampCreate:Timestamp.now()
    },
    {merge:true}
)
}





export const updateFavorites = async ({uid,list})=>{
    await setDoc(doc(db,`user/${uid}`),
    {
        favorits:list        
    },
    {
        merge: true
    }
)
}




export const updateCarts = async ({uid,list})=>{
    await setDoc(doc(db,`user/${uid}`),
    {
        carts:list        
    },
    {
        merge: true
    }
)
}