import { collection, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewBrand = async ({data,image}) =>{

    if(!image){
        throw new Error("Image is required");
    }
    if(!data?.name){
        throw new Error("Name is required");
    }
    // if(!data?.slug){
    //     throw new Error("Slug is required")
    // }

    const newID = doc(collection(db,`ids`)).id

    let imageRef = ref(storage,`brands/${newID}`);

    await uploadBytes(imageRef,image);

    const imageUrl = await getDownloadURL(imageRef)

    await setDoc(doc(db,`brands/${newID}`),{
        ...data,
        id: newID,
        imageUrl: imageUrl,
        timeStampCreate: Timestamp.now(),
    })

}







export const updateBrand = async ({data,image}) =>{


    if(!data?.name){
        throw new Error("Name is required");
    }
    // if(!data?.slug){
    //     throw new Error("Slug is required")
    // }
    if(!data?.id){
        throw new Error("ID is required")
    }
    const id = data?.id

    let imageUrl = data?.imageUrl;


    if(image){
        let imageRef = ref(storage,`brands/${id}`);
    
        await uploadBytes(imageRef,image);
    
        imageUrl = await getDownloadURL(imageRef)
    }


    await updateDoc(doc(db,`brands/${id}`),{
        ...data,
        imageUrl: imageUrl,
        timeStampUpdate: Timestamp.now(),
    })

}