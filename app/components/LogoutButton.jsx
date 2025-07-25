

"use client"


import { signOut } from 'firebase/auth'
import { LogOut } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { auth } from '../../lib/firebase/firebase'
import {useAuth} from '../../contexts/AuthContext'









export default function  LogoutButton(){


    const {user} = useAuth()

    if(!user){
        return <></>
    }


  return (
        <button onClick={ async()=>{
                
            if(!confirm("Are you Sure")) return;
            try{                    
                    await toast.promise(signOut(auth),{
                        error:(e)=>e?.message,
                        loading: "Loading...",
                        success: "Successfully Logged Out"
                    })
                }catch(error){
                    toast.error(error?.message)
                }
            }} className='h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-500'>
                <LogOut size={14}/>
                
            </button>
  )
}

