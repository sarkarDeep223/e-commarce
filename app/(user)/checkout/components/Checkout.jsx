"use client"

import { Button } from "@mui/material"
import { CheckSquare2Icon, Square } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Checkout({productList}){


    const [paymentMode,setPaymentMode] = useState("prepaid")
    const [address,setAddress] = useState(null)
    const [isLoading,setIsLoading] = useState(false)

    const router = useRouter()


    const totalPrice = productList?.reduce((prev,curr)=>{
        return prev + curr?.quantity * curr?.product?.sale_price
    },0)




    const handelAddress = (key,value)=>{
        setAddress({...(address??{}),[key]:value})
    }







    const handelPlaceOrder = async()=>{
        setIsLoading(true)
        try{

            if(totalPrice <= 0){
                throw new Error("Price should be greater then 0")
            }

            if(!address?.fullName || !address?.mobile || !address?.addressLine1){
                throw new Error("Please Fill All Address Details")
            }
            await new Promise((res)=>setTimeout(res,3000))
            toast.success("SuccessFully Placed")
            router.push("/account")

        }catch(error){
            toast.error(error?.message)
        }
        setIsLoading(false)
    }



    return(

        <section className="flex gap-3 md:flex-row ">

            <section className="flex-1 flex flex-col gap-3 border rounded-xl p-4">
                <h1>Shipping Details</h1>

                <div className="flex flex-col gap-2">
                    <input id="full-name" name="full-name" type="text" placeholder="Full Name " className="border px-4 py-2 rounded-lg w-full focus:outline-none" value={address?.fullName ?? ""} onChange={(e)=>{
                        handelAddress("fullName",e.target.value)
                    }} />

                    <input id="mobile" name="mobile" type="tel" placeholder="Phone" className="border px-4 py-2 rounded-lg w-full focus:outline-none" value={address?.mobile ?? ""} onChange={(e)=>{
                        handelAddress("mobile",e.target.value)    
                    }}/>

                    <input id="email" name="email" type="email" placeholder="Email" className="border px-4 py-2 rounded-lg w-full focus:outline-none" value={address?.email ?? ""} onChange={(e)=>{
                        handelAddress("email",e.target.value)
                    }} />
                    <input id="address-line-1" name="address-line-1" type="text" placeholder="Enter Address Line 1" className="border px-4 py-2 rounded-lg w-full focus:outline-none" value={address?.addressLine1 ?? ""} onChange={(e)=>{
                        handelAddress("addressLine1",e.target.value)    
                    }}/>
                    <input id="address-line-2" name="address-line-2"  type="text" placeholder=" Enter Address Line 2" className="border px-4 py-2 rounded-lg w-full focus:outline-none" value={address?.addressLine2 ?? ""} onChange={(e)=>{
                        handelAddress("addressLine2",e.target.value)    
                    }}/>


                    <input id="city" name="city" type="text" placeholder="Enter City" className="border px-4 py-2 rounded-lg w-full focus:outline-none" value={address?.city ?? ""} onChange={(e)=>{
                        handelAddress("city",e.target.value)    
                    }}/>


                    <input  id="state" name="state"  type="text" placeholder="Enter State" className="border px-4 py-2 rounded-lg w-full focus:outline-none" value={address?.state ?? ""} onChange={(e)=>{
                        handelAddress("state",e.target.value)    
                    }}/>

                    <textarea  id="order-note" name="order-note" type="text" placeholder="Notes about you order, e.g special notes for delivery" value={address?.orderNote ?? ""} className="border px-4 py-2 rounded-lg w-full focus:outline-none" onChange={(e)=>{
                        handelAddress('orderNote',e.target.value)
                    }}/>







                </div>


            </section>

            <div className="flex-1 flex flex-col gap-3">


                <section className="flex flex-col gap-3 border rounded-xl p-4">
                    <h1>Products</h1>
                    <div className="flex gap-2 flex-col">
                        {
                            productList?.map((item,index)=>{
                                return(
                                    <div className="flex gap-3 items-center" key={index}>
                                        <img className="w-10 h-10 rounded-lg object-cover" src={item?.product?.featureImageUrl} alt="" />
                                        <div className="flex-1 flex flex-col">
                                            <h1 className="text-sm">{item?.product?.title}</h1>
                                            <h3>$ {item?.product?.price} <span>X</span> <span>{item?.quantity}</span></h3>
                                        </div>
                                        <div>
                                            <h3>
                                                {item?.product?.sale_price}
                                            </h3>
                                            
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex justify-between w-full items-center p-2 font-semibold">
                        <h1>Total</h1>
                        <h1>$ {totalPrice}</h1>
                    </div>
                </section>

                <section className="flex flex-col gap-3 border rounded-xl p-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <h2>Payment Mode</h2>
                        <div className="flex items-center gap-3">
                            <button onClick={()=>{setPaymentMode("prepaid")}} className="flex items-center gap-1 text-sm">{paymentMode === "prepaid" && <CheckSquare2Icon size={13} className="text-blue-500"/>} {paymentMode === "cod" && <Square size={13}/>}  Prepaid</button>
                            <button onClick={()=>{setPaymentMode("cod")}} className="flex items-center gap-1 text-sm">{paymentMode === "prepaid" && <Square size={13}/>} {paymentMode === "cod" && <CheckSquare2Icon size={13} className="text-blue-500"/>}  Cash On Delivery</button>
                        </div>
                    </div>

                    <div className="flex gap-1">
                        <CheckSquare2Icon size={16}/>
                        <h4 className="text-xs text-gray-600"> I agree with the <span className="text-blue-500">terms & condition</span></h4>
                    </div>


                    <Button variant="contained" onClick={handelPlaceOrder} disabled={isLoading}>
                        Place Order
                    </Button>





                </section>
            </div>


        </section>

    )


}