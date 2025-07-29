import Link from "next/link";
import AuthContextProvider from "../../../contexts/AuthContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {admin, adminDB} from "../../../lib/firebase/firebase_admin"



// fetcheckout


// const fetcheckout = async (checkoutId)=>{
//     const list = await adminDB.collectionGroup('checkout_sessions').where("id","===", checkoutId).where('status',"==","successded").get()
//     if(list.docs.length === 0){
//         throw new Error("Invalid Checkout ID")
//     }
//     return list.docs[0]
// }





// const fetchPayment = async (checkoutId)=>{
//     const list = await adminDB.collectionGroup('payments').where("metadata.checkoutId","===", checkoutId).where('status',"==","successded").get()
//     if(list.docs.length === 0){
//         throw new Error("Invalid Checkout ID")
//     }
//     return list.docs[0]
// }



// const processOrder = async ({payment,checkout})=>{
//     const order = await adminDB.doc(`orders/${payment?.id}`).get()

//     if(order.exists){
//         return null;
//     }

//     const uid = payment?.metadata?.uid;


//     await adminDB.doc(`orders/${payment?.id}`).set({
//         checkout: checkout,
//         payment:payment,
//         uid:uid,
//         id:payment?.id,
//         timestampCreate:admin.firestore.Timestamp.now(),
//     })

//     const productList = checkout?.line_items?.map((item)=>{
//         return {
//             productId:item?.price_data?.product_data?.metadata?.productId,
//             quantity:item?.quantity,
//         }
//     })

//     const user =await adminDB.doc(`user/${uid}`).get()

//     const newCartList = (user?.data()?.carts ?? []).filter((cartItem)=>)





// }




export default async function Page({searchParams}){
    const checkoutId = searchParams;
    // const checkout = await fetcheckout(checkoutId)
    // const payment = await fetchPayment(checkoutId)





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