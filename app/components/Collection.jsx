"use client"

import { Button } from "@mui/material";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Slider from "react-slick";

export default function Collections({featuredCollection}) {

  useEffect(()=>{
    console.log("featuredCollection",featuredCollection);
    
  },[featuredCollection])
  


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  return (
    <div className="w-screen overflow-hidden p-10" >
      <Slider {...settings}>
        {featuredCollection?.map((item,index)=>{
          return (

            <div className="px-2">
              <div className="flex gap-4 bg-gradient-to-tr  to-[#d9e2f1] from-[#cce7f5] p-7 w-full h-full rounded-xl" key={index}>
                  <div className=" flex flex-col  gap-4 w-full">

                    <div className="flex flex-col gap-4">
                      <h1 className="text-xl font-semibold">{item?.title}</h1>
                      <h1 className="text-gray-600 text-sm max-w-96 line-clamp-2">{item?.sub_titile}</h1>
                    </div>
                    
                    <div className=" flex gap-4">
                      <Link href={`./collections/${item.id}`}>
                        <Button color="primary" variant="contained" className=" text-50">
                          Show Now
                        </Button>
                      </Link>
                    </div>
                    

                  </div>
                  <div className="w-full">
                    <img className="h-[9rem]" src={item?.imageUrl} alt="" />
                  </div>
                </div>
            </div>

          )
        })}
      </Slider>
    </div>
  );
}