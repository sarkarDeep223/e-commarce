// import React, { Children } from 'react'

"use client"

import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import SideBar from "./Sidebar"
import { usePathname } from "next/navigation"
import { useAuth } from "../../../contexts/AuthContext"

import {useAdmin} from "../../../lib/firebase/admin/read"
import { Button, CircularProgress } from "@mui/material"
import { signOut } from "firebase/auth"
import { auth } from "../../../lib/firebase/firebase"


export default function AdminLayout({children}){
    const [isOpen,setIsOprn] = useState(false)
    const pathName = usePathname()
    const sideBarRef = useRef(null)


    const { user } = useAuth()


    const {data:admin,error,isLoading} = useAdmin({email:user?.email})









    useEffect(()=>{
        toggleSideBar()
    },[pathName])



    useEffect(()=>{
        function handelClickOutsideEvent(event){
            if(sideBarRef.current && !sideBarRef?.current.contains(event.target)){
                setIsOprn(false)
            }
        }
        document.addEventListener("mousedown",handelClickOutsideEvent);
        return ()=>{
            document.removeEventListener("mousedown",handelClickOutsideEvent )
        }
    },[])


    const toggleSideBar=()=>{
        setIsOprn(!isOpen)
    }





    if(isLoading){
        return <div className="h-screen w-screen flex justify-center items-center">
            <CircularProgress/>
        </div>
    }


    if(error){
        return(
            <div className="h-screen w-screen flex justify-center items-center">
                <h1>{error}</h1>
            </div>
        )
    }




    if(!admin){
        return <div className="h-screen w-screen flex flex-col gap-3 justify-center items-center">
            <h1 className="font-bold">You are not Admin</h1>
            <h1 className="text-gray-600 text-sm">{user.email}</h1>
            <Button variant="contained" onClick={async ()=>{
                await signOut(auth)
            }}>
                Log Out
            </Button>
        </div>
    }




    return (
        <main className="relative flex">
            <div className="hidden md:block">
                <SideBar/>
            </div>
            <div ref={sideBarRef} className={`fixed md:hidden ease-in-out transition-all duration-250 z-50 ${isOpen ? "translate-x-0":"-translate-x-[240px]"}`}>
                <SideBar/>
            </div>
            <section className="flex-1 flex flex-col min-h-screen">
                <Header toggleSideBar={toggleSideBar}/>

                <section className="flex-1 bg-[#eff3f4]">
                    {children} 
                </section>
            </section>
        </main>
    )
}


