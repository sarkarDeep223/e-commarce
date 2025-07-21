// import React, { Children } from 'react'

"use client"

import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import SideBar from "./Sidebar"
import { usePathname } from "next/navigation"


export default function AdminLayout({children}){


    const [isOpen,setIsOprn] = useState(false)

    const pathName = usePathname()


    const sideBarRef = useRef(null)

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


