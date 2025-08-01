"use client"

import { useAdmin } from "../../lib/firebase/admin/read"
import { useAuth } from "../../contexts/AuthContext"
import Link from "next/link"

export default function AdminButton(){

    const {user} =useAuth()
    const {data} = useAdmin({email:user?.email})

    if(!data){
        return <></>
    }


    return (
        <Link href={"/admin"}>
            <button className="text-xs font-semibold">
                Admin
            </button>
        </Link>
    )


}