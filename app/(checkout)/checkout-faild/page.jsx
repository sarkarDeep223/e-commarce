import Link from "next/link";
import AuthContextProvider from "../../../contexts/AuthContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { adminDB } from "../../../lib/firebase/firebase_admin";




const fetcheckout = async (checkoutId)=>{
        const list = await adminDB.collectionGroup('checkout_sessions').where("id","==", checkoutId).get()
        if(list.docs.length === 0){
            throw new Error("Invalid Checkout ID")
        }
        return list.docs[0].data()
}




export default async function Page({searchParams}){
    const {checkout_id} = await searchParams;
    const checkout = await fetcheckout(checkout_id)


    return (
        <main>

            <AuthContextProvider>
                <Header/>
            </AuthContextProvider>


            <section className="min-h-screen flex flex-col justify-center items-center">

                <div className="flex justify-center w-full">
                    <img src="./card-faild.png" alt="" className="h-40"/>
                </div>
 
                <h1 className="text-2xl font-semibold"> Your Payment Was Not Success </h1>

                <div className="flex items-center gap-4">

                    <Link href={"/"}>
                        <button className="text-blue-600 border border-blue-600 px-4 py-2  rounded-lg bg-white"> Shop </button>
                    </Link>

                    <Link href={checkout?.url}>
                        <button className="bg-blue-600 border  px-4 py-2  rounded-lg  text-white"> Retry </button>
                    </Link>

                </div>
            </section>


            <Footer/>
        </main>
    )



}