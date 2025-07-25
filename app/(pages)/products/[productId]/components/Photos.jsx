
"use client"


import React, { useState } from 'react'

const Photos = ({imageList}) => {



    const [selectedImage,setSelectedImage] = useState(imageList[0])





  
    if(imageList?.length === 0){
        return <></>
    }

    return (
    <div className='flex  flex-col gap-3 w-full '>
        <div className='flex justify-center'>
            <img className='object-cover h-[350] md:h-[380px]' src={selectedImage} alt="" />
        </div>

        <div className='flex flex-wrap justify-center items-center gap-3'>
            {imageList?.map((item,index)=>{
                return (
                    <div key={index} className='w-[80px] border  p-e' onClick={()=>setSelectedImage(item)}>
                        <img className='object-cover ' src={item} alt="" />
                    </div>
                )
            })}
        </div>


    </div>
  )
}

export default Photos