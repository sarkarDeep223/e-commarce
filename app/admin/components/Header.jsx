
"use client"

import { Menu } from 'lucide-react'
import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Avatar } from '@mui/material'
import { useAdmin } from '../../../lib/firebase/admin/read'

const Header = ({toggleSideBar}) => {



  const {user} = useAuth();
  const {data:admin} = useAdmin({email:user?.email})





  return (
    <section className='sticky top-0 flex items-center gap-3 bg-white border-b px-4 py-4'>
        <div className=' flex justify-center items-center md:hidden'>
            <button onClick={toggleSideBar}>
                <Menu />
            </button>
        </div>



        <div className='px-2 flex-1 flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Dashbord</h1>
          <div>
            <Avatar sizes={20} src={admin?.imageUrl}/>
          </div>
        </div>





    </section>
  )
}

export default Header