import { collection, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewCollection = async ({data,image}) =>{

    if(!image){
        throw new Error("Image is required");
    }
    if(!data?.title){
        throw new Error("Title is required");
    }
    if(!data?.products || data.products?.length === 0){
        throw new Error("products is required")
    }

    const newID = doc(collection(db,`ids`)).id

    let imageRef = ref(storage,`collections/${newID}`);

    await uploadBytes(imageRef,image);

    const imageUrl = await getDownloadURL(imageRef)

    await setDoc(doc(db,`collections/${newID}`),{
        ...data,
        id: newID,
        imageUrl: imageUrl,
        timeStampCreate: Timestamp.now(),
    })

}







export const updateCollection = async ({data,image}) =>{


    if(!data?.title){
        throw new Error("Title is required");
    }
    if(!data?.products || data.products?.length === 0){
        throw new Error("products is required")
    }
    if(!data?.id){
        throw new Error("ID is required")
    }
    
    const id = data?.id

    let imageUrl = data?.imageUrl;


    if(image){
        let imageRef = ref(storage,`collections/${id}`);
    
        await uploadBytes(imageRef,image);
    
        imageUrl = await getDownloadURL(imageRef)
    }


    await updateDoc(doc(db,`collections/${id}`),{
        ...data,
        imageUrl: imageUrl,
        timeStampUpdate: Timestamp.now(),
    })

}