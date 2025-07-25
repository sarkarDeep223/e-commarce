import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

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