import { collection, doc, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore"
import { db } from "../firebase"

export const getcollection = async ({id})=>{

    const data = await getDoc(doc(db,`collections/${id}`));
    if(data.exists()){
        return data.data()
    }else {
        return null
    }

}



export const getFeaturedCollection = async () =>{
    const list = await getDocs(query(collection(db,'collections'),where("isFeatured", "==", "Yes")))
      return list.docs.map((snap) => ({
            id: snap.id,
            ...serializeProduct(snap.data())
        }));
}



function serializeProduct(product) {
  const serialized = {};

  for (const key in product) {
    const value = product[key];

    if (value instanceof Timestamp) {
      serialized[key] = value.toDate().toISOString();
    } else if (Array.isArray(value)) {
      serialized[key] = value.map(item =>
        item instanceof Timestamp ? item.toDate().toISOString() : item
      );
    } else {
      serialized[key] = value;
    }
  }

  return serialized;
}