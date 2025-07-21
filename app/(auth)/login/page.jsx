
'use client'


import { Box, Button, CircularProgress } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../../../lib/firebase/firebase'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'

const page = () => {



    const {user} = useAuth();

    const router = useRouter()


    useEffect(()=>{
        console.log("user",user);
        
        if(user){
            router.push("/dashboard")
        }
    },[user])




  return (
    <main className='w-full flex justify-center items-center bg-gray-300 p-24 min-h-screen'>

        <section className='flex flex-col gap-3'>
            <div className='flex justify-center '> 
                <img className='h-24' src="/demologo.png" alt="logo" />
            </div>
            <div className='bg-white p-10 rounded-xl min-w-[400px] flex flex-col gap-4'>


                <h1 className='font-bold text-xl'>Login with Email</h1>

                <form className='flex flex-col gap-4'>

                    <input type="email" name='user_email' id='user_email' placeholder='Enter Your Email' className='px-3 py-2 rounded-xl border focus:outline-none w-full'/>
                    <input type="password" name='user_password' id='user_password' placeholder='Enter Your password' className='px-3 py-2 rounded-xl border focus:outline-none w-full'/>
                    <Button className='rounded-lg bg-blue-600' variant="contained"> Log in</Button>
                </form>



                <div className='flex justify-between'>
                    <Link href={`/forgot-password`}>
                        <button className=' text-blue-700'>
                            Forgot Password?
                        </button>
                    </Link>
                    <Link href={`/sign-up`}>
                        <button className=' text-blue-700'>
                            New? Sign Up
                        </button>
                    </Link>
                </div>
                <hr />
                <SignInWithGoogleCompponent/>
            </div>
        </section>

    </main>
  )
}

export default page



function SignInWithGoogleCompponent(){
    const [loader,setLoader] = useState(false)

    const handelLogin = async () =>{
        setLoader(true)
        try{
            const user =   await signInWithPopup(auth,new GoogleAuthProvider())
        }catch(error){
            // console.log(err)
            toast.error(error?.message)
        }
        setLoader(false)
    }

    return <Button variant='outlined' onClick={handelLogin} disabled={loader} > {loader?     <Box sx={{ display: 'flex'}}>
      <CircularProgress size="25px"/>
    </Box>: 'Sign In Google'} </Button>


}