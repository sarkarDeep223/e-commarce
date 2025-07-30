import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../firebase"

export const createCheckOutAndGetUrl= async ({uid,productList,address})=>{
    const checkoutId = doc(collection(db,`ids`)).id
    const ref = doc(db,`user/${uid}/checkout_sessions/${checkoutId}`)
    let line_items = [];
    productList.forEach(item => {
        console.log("item",item);
        
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item?.product?.title ?? "",
                    description:item?.product?.short_description ?? "",
                    images: [item?.product?.featureImageUrl ?? `${process.env.NEXT_PUBLIC_DOMAIN}/demologo.png` ],
                    metadata:{
                        productId: item?.id,
                    }
                },
                unit_amount: item?.product?.sale_price * 100
            },
            quantity:item.quantity
        })
    });

    await setDoc(ref,{
        id:checkoutId,
        payment_method_types:["card"],
        mode:"payment",
        line_items:line_items,
        metadata:{
            checkoutId:checkoutId,
            uid:uid,
            address:JSON.stringify(address)
        },
        success_url:`http://localhost:3000/checkout-success?checkout_id=${checkoutId}`,
        cancel:`http://localhost:3000/checkout-failed?checkout_id=${checkoutId}`
    })
    await new Promise((res)=>setTimeout(res,2000))
    const checkoutSession = await getDoc(ref)

    if(!checkoutSession?.exists()){
        throw new Error("checkout Session Not Found")
    }

    if(checkoutSession?.data()?.error?.message){
        throw new Error(checkoutSession?.data()?.error?.message)
    }

    const url = checkoutSession.data()?.url

    if(url){
        return url;

    }else{
        await new Promise((res)=>setTimeout(res,2000))
        const checkoutSession = await getDoc(ref);

        if(checkoutSession?.data()?.error?.message){
        throw new Error(checkoutSession?.data()?.error?.message)
        }

        if(checkoutSession.data()?.url){
            return checkoutSession.data()?.url
        }else{
            await new Promise((res)=>setTimeout(res,3000))
            const checkoutSession = await getDoc(ref);
            if(checkoutSession?.data()?.error?.message){
                throw new Error(checkoutSession?.data()?.error?.message)
            }
            if(checkoutSession.data()?.url){
                return checkoutSession.data()?.url
            }else{
                await new Promise((res)=>setTimeout(res,5000))
                const checkoutSession = await getDoc(ref);
                if(checkoutSession?.data()?.error?.message){
                throw new Error(checkoutSession?.data()?.error?.message)
                }
                if(checkoutSession.data()?.url){
                    return checkoutSession.data()?.url
                }else{
                    throw new Error("Somthing Went Wrong")
                }
            }
        }
    }
}




export const createCheckOutCODAndGetId = async ({uid,productList,address})=>{
    const checkoutId = doc(collection(db,`ids`)).id
    const ref = doc(db,`user/${uid}/checkout_sessions_cod/${checkoutId}`)
    let line_items = [];
    productList.forEach(item => {
        console.log("item",item);
        
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item?.product?.title ?? "",
                    description:item?.product?.short_description ?? "",
                    images: [item?.product?.featureImageUrl ?? `${process.env.NEXT_PUBLIC_DOMAIN}/demologo.png` ],
                    metadata:{
                        productId: item?.id,
                    }
                },
                unit_amount: item?.product?.sale_price * 100
            },
            quantity:item.quantity
        })
    });

    await setDoc(ref,{
        id:checkoutId,
        line_items:line_items,
        metadata:{
            checkoutId:checkoutId,
            uid:uid,
            address:JSON.stringify(address)
        },
        createdAt:Timestamp.now()

    })


    return checkoutId;

}