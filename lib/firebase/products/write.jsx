import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../firebase"
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"



export const createNewProduct = async ({data,featureImage,imageList})=>{

    if(!data?.title){
        throw new Error("Title is required")
    }

    if(!featureImage){
        throw new Error("Feature Image is required")
    }


    const featureImageRef = ref(storage,`products/${featureImage?.name}`)

    await uploadBytes(featureImageRef,featureImage);

    const featureImageUrl = await getDownloadURL(featureImageRef)

    let imageUrlList = []

    for(let i = 0; i < imageList?.length; i++){
        const image = imageList[i]
        const imageRef = ref(storage,`products/${image?.name}`);
        await uploadBytes(imageRef,image)
        const url = await getDownloadURL(imageRef)
        imageUrlList.push(url)
    }


    const newID = doc(collection(db,'ids')).id

    await setDoc(doc(db,`products/${newID}`),{
        ...data,
        featureImageUrl:featureImageUrl,
        imageUrlList:imageUrlList,
        id:newID,
        timeStampCreated: Timestamp.now()
    })

}





export const updateProducts = async ({data,featureImage,imageList})=>{

    if(!data?.title){
        throw new Error("Title is required")
    }



    if(!data?.id){
        throw new Error("ID is required")
    }

    const id = data?.id
    let featureImageUrl = data.featureImageUrl
    let imageUrlList = data.imageUrlList


    if(featureImage){
        const featureImageRef = ref(storage,`products/${featureImage?.name}`)
        await uploadBytes(featureImageRef,featureImage);
        featureImageUrl = await getDownloadURL(featureImageRef)
    }

    if(imageList.length > 0){
        imageUrlList = []

        for(let i = 0; i < imageList?.length; i++){
            const image = imageList[i]
            const imageRef = ref(storage,`products/${image?.name}`);
            await uploadBytes(imageRef,image)
            const url = await getDownloadURL(imageRef)
            imageUrlList.push(url)
        }
    }


    await updateDoc(doc(db,`products/${id}`),{
        ...data,
        featureImageUrl:featureImageUrl,
        imageUrlList:imageUrlList,
        timeStampUpdate: Timestamp.now(),
    })


}











export const deleteProduct = async ({id})=>{
    if(!id){
        throw new Error("ID is Required");
    }
    await deleteDoc(doc(db,`products/${id}`))
}