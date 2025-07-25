"use client"
import { IconButton } from "@mui/material";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";

export default function FeatureProductSlider({featuredProducts}) {


  


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-screen overflow-hidden" >
      <Slider {...settings}>
        {featuredProducts?.map((item,index)=>{
          return (

            <div>
              <div className="flex gap-4  bg-[#f8f8f8] p-10 md:px-24 md:py-20 w-full" key={index}>
                  <div className="flex-1 flex flex-col gap-10">

                    <h2 className="text-gray-500">Bro Fashion</h2>

                    <div className="flex flex-col gap-4">
                      <Link href={`./products/${item?.id}`}>
                        <h1 className="text-4xl font-semibold">{item?.title}</h1>
                      </Link>
                      <h1 className="text-gray-600 text-sm max-w-96 line-clamp-2">{item?.short_description}</h1>
                    </div>
                    
                    <div className=" flex gap-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-xl"> BUY NOW </button>
                      <button className="border-2 border-blue-500 text-blue px-4 py-2 rounded-xl">ADD TO CART </button>
                      {/* <IconButton aria-label="delete" size="large"> */}

                      <button className="border-2 border-pink-500 text-pink-500 px-4 py-2 rounded-full">
                        <Heart className="h-5 w-5"/>
                      </button>
                      {/* </IconButton> */}
                    </div>
                    

                  </div>
                  <div>
                    <img className="h-[28rem]" src={item?.featureImageUrl} alt="" />
                  </div>
                </div>
            </div>

          )
        })}
      </Slider>
    </div>
  );
}