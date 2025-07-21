"use client"

import { useEffect } from "react"
import AuthContextProvider, { useAuth } from "../../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { CircularProgress } from "@heroui/react"
import AdminLayout from "./components/AdminLayout"



export default function Layout ({children}){
    return (
        <AuthContextProvider>
            <AdminChecking>
                {children}
            </AdminChecking>
        </AuthContextProvider>
    )
}




function AdminChecking({children}){
    const {user,isLoading} = useAuth()

    const router = useRouter()

    useEffect(()=>{
        if(!user && !isLoading){
            router.push("/login")
        }


    },[user,isLoading])



    if(isLoading){
        return <div className="h-screen w-screen flex justify-center item-center"> 
            <CircularProgress/>
        </div>
    }



    if(!user){
        return <div className="h-screen w-screen flex justify-center item-center"> 
            <h1>Plese Login first </h1>
        </div>
    }


    return <AdminLayout>{children}</AdminLayout>
}
