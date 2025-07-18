import Link from 'next/link'
import React from 'react'

const Header = () => {

    const menuList = [
        // { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
    ]


    
  return (
    <nav className='py-3 px-16 border-b flex items-center justify-between' >
        <img src="/demologo.png" alt="Logo" className='h-20' />
        <div className='flex items-center gap-4'>
            {menuList.map((item,index)=>{
                return <Link href={item.path} key={index}>
                    <button> {item.name} </button>
                </Link>
            })}
        </div>


        <Link href={"/login"}>
            <button className='bg-blue-600 px-3 py-2 rounded-full text-white'>Login</button>
        </Link>
    </nav>
  )
}

export default Header