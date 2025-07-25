import { collection, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore"
import { db } from "../firebase"

export const getProduct = async ({id})=>{

    const data = await getDoc(doc(db,`products/${id}`));
    if(data.exists()){
        return data.data()
    }else {
        return null
    }

}



export const getFeaturedProduct = async () =>{
    const list = await getDocs(query(collection(db,'products'),where("isFeatured", "==", "Yes")))
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



export const getProducts = async () =>{
  const list = await getDocs(
    query(collection(db,"products"),orderBy('timeStampCreated','desc'))
  )
  return list.docs.map((snap) => ({
    id: snap.id,
    ...serializeProduct(snap.data())
  }));
}



export const getProductsByCategory = async ({categoryId}) =>{
  const list = await getDocs(
    query(collection(db,"products"),orderBy('timeStampCreated','desc'),where("categoryId","==",categoryId))
  )
  return list.docs.map((snap) => ({
    id: snap.id,
    ...serializeProduct(snap.data())
  }));
}


