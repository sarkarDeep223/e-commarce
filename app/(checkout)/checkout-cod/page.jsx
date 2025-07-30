import Link from "next/link";
import AuthContextProvider from "../../../contexts/AuthContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {admin, adminDB} from "../../../lib/firebase/firebase_admin"








// fetcheckout


const fetcheckout = async (checkoutId)=>{
        const list = await adminDB.collectionGroup('checkout_sessions_cod').where("id","==", checkoutId).get()
        if(list.docs.length === 0){
            throw new Error("Invalid Checkout ID")
        }
        return list.docs[0].data()
}





// const fetchPayment = async (checkoutId)=>{
//     const list = await adminDB.collectionGroup('payments').where("metadata.checkoutId","==", checkoutId).where('status',"==","succeeded").get()
//     if(list.docs.length === 0){
//         throw new Error("Invalid Checkout ID")
//     }
//     return list.docs[0].data()
// }



const processOrder = async ({checkout})=>{
    const order = await adminDB.doc(`orders/${checkout?.id}`).get()

    if(order.exists){
        return false;
    }

    const uid = checkout?.metadata?.uid;


    await adminDB.doc(`orders/${checkout?.id}`).set({
        checkout: checkout,
        uid:uid,
        id:checkout?.id,
        paymentMode:"cod",
        timestampCreate:admin.firestore.Timestamp.now(),
    })

    const productList = checkout?.line_items?.map((item)=>{
        return {
            productId:item?.price_data?.product_data?.metadata?.productId,
            quantity:item?.quantity,
        }
    })

    const user = await adminDB.doc(`user/${uid}`).get()

    const productIdsList = productList?.map((item)=> item?.productId)


    const newCartList = (user?.data()?.carts ?? []).filter((cartItem)=>!productIdsList.includes(cartItem?.id))




    await adminDB.doc(`user/${uid}`).set({
        carts : newCartList
    },{merge:true})




    const batch = adminDB.batch();

    productList?.forEach((item)=>{
        batch.update(adminDB.doc(`products/${item?.productId}`),{
            orders:admin.firestore.FieldValue.increment(item?.quantity)
        })
    })




    await batch.commit();


}




export default async function Page({searchParams}){
    const {checkout_id} = await searchParams;
    const checkout = await fetcheckout(checkout_id)
    const result = await processOrder({checkout})


    return (
        <main>

            <AuthContextProvider>
                <Header/>
            </AuthContextProvider>


            <section className="min-h-screen flex flex-col justify-center items-center gap-5">

                <div className="flex justify-center w-full">
                    <img src="./Order ahead-amico.png" alt="" className="h-40"/>
                </div>
 
                <h1 className="text-2xl font-semibold text-green-600"> Your Order is placed </h1>

                <div className="flex items-center gap-4">

                    <Link href={"/account"}>
                        <button className="text-blue-600 border border-blue-600 px-4 py-2  rounded-lg bg-white"> Go To Order page </button>
                    </Link>



                </div>
            </section>


            <Footer/>
        </main>
    )



}