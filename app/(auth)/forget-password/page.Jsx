
'use client'


import { Button } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import toast from 'react-hot-toast'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from 'firebase/auth'
import { auth } from '../../../lib/firebase/firebase'
import { creatUser } from '../../../lib/firebase/user/write'

const page = () => {
    const {user} = useAuth();
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)

    const [data,setData]= useState(null)

    const handelData = (key,value)=>{
        setData({
            ...data,
            [key]:value
        })
    }



    const handleSendEmail = async ()=>{
        setIsLoading(true)
        try{
            await sendPasswordResetEmail(auth,data?.email)

            toast.success("Reset Link has been sent to your email")

        }catch(error){
            toast.error(error?.message)
        }
        setIsLoading(false)
    }

    useEffect(()=>{        
        if(user){
            router.push("/account")
        }
    },[user])




  return (
    <main className='w-full flex justify-center items-center bg-gray-300 p-24 min-h-screen'>

        <section className='flex flex-col gap-3'>
            <div className='flex justify-center '> 
                <img className='h-24' src="/demologo.png" alt="logo" />
            </div>
            <div className='bg-white p-10 rounded-xl min-w-[400px] flex flex-col gap-4'>


                <h1 className='font-bold text-xl'>Forgot Password</h1>

                <form className='flex flex-col gap-4' onSubmit={(e)=>{
                    e.preventDefault()
                    handleSendEmail()
                }}>

                    {/* <input value={data?.name ?? ""} onChange={(e)=>handelData('name',e.target.value)} type="text" name='user_name' id='user_name' placeholder='Enter Your Name' className='px-3 py-2 rounded-xl border focus:outline-none w-full'/> */}
                    <input value={data?.email ?? ""} onChange={(e)=>handelData('email',e.target.value)} type="email" name='user_email' id='user_email' placeholder='Enter Your Email' className='px-3 py-2 rounded-xl border focus:outline-none w-full'/>
                    {/* <input value={data?.password ?? ""} onChange={(e)=>handelData('password',e.target.value)} type="password" name='user_password' id='user_password' placeholder='Enter Your password' className='px-3 py-2 rounded-xl border focus:outline-none w-full'/> */}
                    <Button type='submit' className='rounded-lg bg-blue-600' variant="contained" disabled={isLoading}> Send Reset Link </Button>
                </form>



                <div className='flex justify-between'>
                    {/* <Link href={`/forgot-password`}>
                        <button className=' text-blue-700'>
                            Forgot Password?
                        </button>
                    </Link> */}
                    <Link href={`/login`}>
                        <button className=' text-blue-700'>
                            Already user? Sign In
                        </button>
                    </Link>
                </div>
                {/* <hr /> */}
                {/* <SignInWithGoogleCompponent/> */}
            </div>
        </section>

    </main>
  )
}

export default page



