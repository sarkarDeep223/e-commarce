"use client"

import { IconButton } from "@mui/material"
import toast from "react-hot-toast"
import { useAuth } from "../../contexts/AuthContext"
import {updateFavorites} from "../../lib/firebase/user/write"
import {useUser} from "../../lib/firebase/user/read"
import { useState } from "react"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from "next/navigation"
export default function FevoritButton({productId}){

    const {user} = useAuth();
    const {data} = useUser({uid:user?.uid})
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const handelClick = async () =>{
        setIsLoading(true)
        try{

            if(!user?.uid){
                router.push('/login')
                throw new Error("Plese Logged In First!")
            }


            if(data?.favorits?.includes(productId)){
                const nelist = data?.favorits?.filter((item)=>item != productId)
                await updateFavorites({list:nelist,uid:user?.uid})
            }else {
                await updateFavorites({list:[...(data?.favorits ?? []),productId],uid:user?.uid})
            }
        }catch(error){
            toast.error(error?.message)
        }

        setIsLoading(false)
    }


    const isLiked = data?.favorits?.includes(productId)








    return (
        <IconButton size="small" color={isLiked? "error":"primary"} onClick={handelClick} disabled={isLoading}>
            
            {
                isLiked ?
                <FavoriteIcon />:
                <FavoriteBorderOutlinedIcon size={20}/>

            }

        </IconButton>
    )

}