import { Rating } from "@mui/material"

export default function CustomerReviews(){



    const customerReviews = [
    {
        name: "Penny Albritton",
        message: "Absolutely loved the product quality and packaging. Will buy again!",
        rating: 4.6,
        imageLink:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "Marcus Reed",
        message: "Delivery was fast and the item matched the description perfectly.",
        rating: 4.8,
        imageLink:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "Sandra Liu",
        message: "Decent quality for the price. Customer service was also responsive.",
        rating: 4.2,
        imageLink: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "Ravi Malhotra",
        message: "Exceeded my expectations! Very happy with the purchase.",
        rating: 4.9,
        imageLink: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
    },
    {
        name: "Jenna Park",
        message: "A few minor issues, but overall a good experience. Worth the money.",
        rating: 4.3,
        imageLink:"https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
    }
    ]






    return(
        <section className="flex justify-center">



            <div className="w-full p-4  md:max-w-[900px] grid gap-3 grid-cols-1 md:grid-cols-3">
                {customerReviews?.map((item,index)=>{
                    return (
                        <div key={index} className="flex flex-col gap-2 p-4 rounded-lg justify-center items-center border">
                            <img src={item.imageLink} className="h-32 w-32 rounded-full object-cover" alt="" />
                            <h1 className="text-sm font-semibold">{item.name}</h1>
                            <Rating size="small" name="product-rating" defaultValue={item.rating} precision={item.rating} readOnly/>
                            <p className="text-sm text-gray-500 test-center">{item.message}</p>
                        </div>
                    )
                })}
            </div>

        </section>
    )
}