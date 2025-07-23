"use client"

import { useBrands } from "../../../../../lib/firebase/brands/read"
import { useCategories } from "../../../../../lib/firebase/categories/read"

export default function BasicDetails({data,handelData}){

    const {data:brands} = useBrands()
    const {data:categories} = useCategories()


    return (

        <section className="bg-white rounded-xl p-4 border flex flex-col gap-3 flex-1">
            <h1 className="font-semibold">Basic details</h1>
            <div  className="flex flex-col gap-1">
                <label htmlFor="product-title" className="text-gray-500 text-xs">
                    Product Name 
                    <span className="text-red-500">*</span>
                </label>
                <input value={data?.title??""} type="text" placeholder="Enter Title" id="product-title" name="product-title" className="border px-3 py-4 rounded-lg w-full outline-none"
                onChange={(e)=>{
                    handelData("title",e.target.value)
                }}
                required
                />
            </div>


            <div  className="flex flex-col gap-1">
                <label htmlFor="product-short-description" className="text-gray-500 text-xs">
                    Short Description 
                    <span className="text-red-500">*</span>
                </label>
                <input value={data?.short_description??""} type="text" placeholder="Enter Short Description" id="product-short-description" name="product-short-description" className="border px-3 py-4 rounded-lg w-full outline-none"
                onChange={(e)=>{
                    handelData("short_description",e.target.value)
                }}
                required
                />
            </div>


            

            <div  className="flex flex-col gap-1">
                <label htmlFor="select-brand" className="text-gray-500 text-xs">
                    Brand 
                    <span className="text-red-500">*</span>
                </label>

                <select
                type="text"
                placeholder="Select Brand"
                id="select-brand"
                name="select-brand"
                value={data?.brandId??""}
                onChange={(e)=>{
                    handelData("brandId",e.target.value)
                }}
                className="border px-4 py-2 rounded-lg w-full outline-none"
                required
                >

                    <option value="">Select Brand</option>

                    {
                        brands?.map((item)=>{
                            return(
                                <option value={item?.id} key={item?.id}>
                                    {item?.name}
                                </option>
                            )
                        })
                    }

                </select>


            </div>


            <div  className="flex flex-col gap-1">
                <label htmlFor="select-category" className="text-gray-500 text-xs">
                    Category
                    <span className="text-red-500">*</span>
                </label>

                <select
                type="text"
                placeholder="Select category"
                id="select-category"
                name="select-category"
                value={data?.categoryId??""}
                onChange={(e)=>{
                    handelData("categoryId",e.target.value)
                }}
                className="border px-4 py-2 rounded-lg w-full outline-none"
                required
                >

                    <option value="">Select Category</option>

                    {
                        categories?.map((item)=>{
                            return(
                                <option value={item?.id} key={item?.id}>
                                    {item?.name}
                                </option>
                            )
                        })
                    }

                </select>


            </div>





            <div  className="flex flex-col gap-1">
                <label htmlFor="product-stock" className="text-gray-500 text-xs">
                    Stock
                    <span className="text-red-500">*</span>
                </label>
                <input value={data?.stock??""} type="number" placeholder="Enter Stock" id="product-stock" name="product-stock" className="border px-3 py-4 rounded-lg w-full outline-none"
                onChange={(e)=>{
                    handelData("stock",e.target.valueAsNumber)
                }}
                required
                />
            </div>




            <div  className="flex flex-col gap-1">
                <label htmlFor="product-price" className="text-gray-500 text-xs">
                    Price
                    <span className="text-red-500">*</span>
                </label>
                <input value={data?.price??""} type="number" placeholder="Enter price" id="product-price" name="product-price" className="border px-3 py-4 rounded-lg w-full outline-none"
                onChange={(e)=>{
                    handelData("price",e.target.valueAsNumber)
                }}
                required
                />
            </div>


            <div  className="flex flex-col gap-1">
                <label htmlFor="sale-price" className="text-gray-500 text-xs">
                    Sale Price
                    <span className="text-red-500">*</span>
                </label>
                <input value={data?.sale_price??""} type="number" placeholder="Enter Sale Price" id="sale-price" name="sale-price" className="border px-3 py-4 rounded-lg w-full outline-none"
                onChange={(e)=>{
                    handelData("sale_price",e.target.valueAsNumber)
                }}
                required
                />
            </div>



            <div  className="flex flex-col gap-1">
                <label htmlFor="product-is-featured" className="text-gray-500 text-xs">
                   Is Featured
                    <span className="text-red-500">*</span>
                </label>
                <select value={data?.isFeatured === "Yes" ? "Yes":"No"} type="number"  id="product-is-featured" name="product-is-featured" className="border px-3 py-4 rounded-lg w-full outline-none"
                onChange={(e)=>{
                    handelData("isFeatured",e.target.value)
                }}
                required
                >

                <option value={"no"}> No</option>
                <option value={"Yes"}> Yes</option>

                </select>
            </div>






        </section>


    )


}