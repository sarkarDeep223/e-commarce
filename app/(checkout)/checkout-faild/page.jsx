import Link from "next/link";
import AuthContextProvider from "../../../contexts/AuthContext";
import Footer from "../../components/Footer";
import Header from "../../components/Header";




export default function Page({searchParams}){
    const checkoutId = searchParams;


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

                    <Link href={"/"}>
                        <button className="bg-blue-600 border  px-4 py-2  rounded-lg  text-white"> Retry </button>
                    </Link>

                </div>
            </section>


            <Footer/>
        </main>
    )



}