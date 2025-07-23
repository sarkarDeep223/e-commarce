import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

export const getcollection = async ({id})=>{

    const data = await getDoc(doc(db,`collections/${id}`));
    if(data.exists()){
        return data.data()
    }else {
        return null
    }

}