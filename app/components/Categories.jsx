"use client"

import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import Slider from "react-slick";

export default function Categories({categorys}) {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  return (
    <div className="flex flex-col gap-8  w-screen overflow-hidden p-10" >


      <div className="flex justify-center w-full">
        <h1 className="text-lg font-semibold">Shop By Category</h1>
      </div>




      <Slider {...settings}>
        {categorys?.map((item,index)=>{
          return (
            <Link href={`/categories/${item.id}`}>
              <div className="px-2">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="h-32 w-32 rounded-full p-5 border overflow-hidden">
                      <img src={item?.imageUrl} alt="" />
                  </div>
                  <h1 className="font-semibold">
                    {item?.name}
                  </h1>
                  <Button  color="primary" variant="contained" >View</Button>
                </div>
              </div>
            </Link>
          )
        })}
      </Slider>
    </div>
  );
}