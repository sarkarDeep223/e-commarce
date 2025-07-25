"use client"
import { Heart, Search, ShoppingCart, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import LogoutButton from "./LogoutButton"
import AuthContextProvider from '../../contexts/AuthContext'
import { Badge } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'
import { useUser } from '../../lib/firebase/user/read'

const Header = () => {

    const {user} = useAuth()
    const {data} = useUser({uid:user?.uid})

    const menuList = [
        // { name: 'Home', path: '/' },
        { name: 'Home', path: '/' }
    ]


    
  return (
    <nav className='sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-2xl py-3 px-4 md:px-16 border-b flex items-center justify-between' >
        <Link href={'/'}>
            <img src="/demologo.png" alt="Logo" className='h-8 nd:h-5' />
        </Link>
        <div className='flex items-center gap-2'>
            {menuList.map((item,index)=>{
                return <Link href={item.path} key={index} >
                    <button className='text-sm px-4 py-2 rounded-lg hover:bg-gray-50'> {item.name} </button>
                </Link>
            })}
        </div>

        <div className='flex items-center gap-2'>
            <Link href={`/search`}>
                <button title='Search' className='h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-500'>
                    <Search size={14}/>
                </button>
            </Link>

            <Link href={`/favorites`}>
                <Badge   color="primary" badgeContent={data?.favorits?.length ?? 0}>
                    <button title='My Fevorit' className='h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-500'>
                        <Heart size={14}/>
                    </button>
                </Badge>
            </Link>

            <Link href={`/cart`}>
                <Badge color="primary" badgeContent={data?.carts?.length ?? 0}>
                    <button title='My Cart' className='h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-500'>
                        <ShoppingCart size={14}/>
                    </button>
                </Badge>
            </Link>

            <Link href={`/account`}>
                <button title='Account' className='h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-500'>
                    <UserCircle2 size={14}/>
                </button>
            </Link>

            <AuthContextProvider>
                <LogoutButton/>
            </AuthContextProvider>

        </div>
        
    </nav>
  )
}

export default Header