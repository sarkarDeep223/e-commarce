"use client"

import { IconButton } from "@mui/material"
import toast from "react-hot-toast"
import { useAuth } from "../../contexts/AuthContext"
import {updateCarts} from "../../lib/firebase/user/write"
import {useUser} from "../../lib/firebase/user/read"
import { useState } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from "next/navigation"




export default function AddToCartButton({productId}){

    const {user} = useAuth();
    const {data} = useUser({uid:user?.uid})
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const isAdded = data?.carts?.find((item)=>item?.id === productId)

    const handelClick = async () =>{
        setIsLoading(true)
        try{

            if(!user?.uid){
                router.push('/login')
                throw new Error("Plese Logged In First!")
            }


            if(isAdded){
                const nelist = data?.carts?.filter((item)=>item?.id != productId)
                await updateCarts({list:nelist,uid:user?.uid})
            }else {
                await updateCarts({list:[...(data?.carts ?? []),{id:productId ,quantity:1}] , uid: user?.uid})
            }
        }catch(error){
            toast.error(error?.message)
        }

        setIsLoading(false)
    }











    return (
        <IconButton size="small" color={isAdded? "success":"primary"} onClick={handelClick} disabled={isLoading}>
            
            {
                isAdded ?
                <ShoppingCartIcon />:
                <ShoppingCartOutlinedIcon size={20}/>

            }

        </IconButton>
    )

}