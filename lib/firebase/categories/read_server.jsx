import { collection, doc, getDoc, getDocs, query, Timestamp } from "firebase/firestore"
import { db } from "../firebase"

export const getCategory = async ({id})=>{

    const data = await getDoc(doc(db,`categories/${id}`));
    if(data.exists()){
        return data.data()
    }else {
        return null
    }

}


export const getCategorys = async () =>{
    const list = await getDocs(query(collection(db,'categories')))
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


