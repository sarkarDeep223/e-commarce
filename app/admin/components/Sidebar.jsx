"use client"
import { signOut } from 'firebase/auth'
import { Container, Drama, Images, LayoutDashboard, LogOut, PackageSearch, SquareStack, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { auth } from '../../../lib/firebase/firebase'

const Sidebar = () => {



    const menulist =[
        {
            name: "Dashboard",
            link: "/admin",
            icon : <LayoutDashboard className='h-5 w-5'/>
        },
        {
            name: "Products",
            link: "/admin/products",
            icon: <PackageSearch className='h-5 w-5'/>
        },
        {
            name: "Categories",
            link: "/admin/categories",
            icon: <SquareStack className='h-5 w-5'/>
        },
        {
            name: "Brands",
            link: "/admin/brands",
            icon: <Drama className='h-5 w-5'/>
        },
        {
            name: "Admins",
            link: "/admin/admins",
            icon: <UserCheck className='h-5 w-5' />
        },
        {
            name: "Collections",
            link: "/admin/collections",
            icon: <Images className="h-5 w-5"/>
        },
        {
            name: "Order",
            link: "/admin/orders",
            icon: <Container className='h-5 w-5' />
        }
    ]



  return (
    <section className='sticky top-0 flex flex-col gap-10  bg-white border-r px-5 py-3 h-screen overflow-hidden w-[240px] '>
        
        <div className='flex justify-center py-4'>
            <Link href={`/`}>
                <img className='h-10' src="/demologo.png"/>
            </Link>
        </div>

        <ul className='flex-1 h-full overflow-y-auto flex flex-col gap-3'>
            {
                menulist?.map((item,index)=>{
                    return <Tab key={index} item={item}/>
                })
            }
        </ul>
        <div className='flex justify-center '>
            <button onClick={ async()=>{
                try{
                    await toast.promise(signOut(auth),{
                        error:(e)=>e?.message,
                        loading: "Loading...",
                        success: "Successfully Logged Out"
                    })
                }catch(error){
                    toast.error(error?.message)
                }
            }} className='flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full justify-center ease-soft-spring transition-all duration-300'>
                <LogOut className="h-5 w-5"/>
                Logout
            </button>
        </div>
    </section>
)
}

export default Sidebar


function Tab({item}){

    const pathName = usePathname();

    const isSelected = pathName === item?.link

    return (
        <Link href={item?.link} >
            <li className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300 ${isSelected ? "bg-blue-600 text-white": "bg-white text-black"}`}>
                {item.icon} {item.name}
            </li>
        </Link>

    )
}