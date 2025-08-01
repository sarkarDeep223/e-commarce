"user client"

import {useProductCount} from "../../../lib/firebase/products/count/read_client"
import { useUserCount } from "../../../lib/firebase/user/read_count"
import { useOrderCount } from "../../../lib/firebase/orders/read_count"
export default function CountMeter(){
    const { data:productCount } = useProductCount({})
    const { data:UserCount } = useUserCount({})
    const { data:orderDetails } = useOrderCount()
    
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <Card title={'Product'}  imgURL={'/cubes.png'} value={productCount ?? 0}/>
            <Card title={'Order'}  imgURL={'/shopping-bag.png'} value={orderDetails?.totalOrder ?? 0}/>
            <Card title={'Revenue'}  imgURL={'/salary.png'} value={`$ ${orderDetails?.totalRevenue / 100}`}/>
            <Card title={'Customer'}  imgURL={'/customer.png'} value={UserCount ?? 0}/>
        </section>
    )



}



function Card({title,value,imgURL}){

    return (
        <div className=" flex gap-2 px-4 py-2 bg-white shadow rounded-xl w-full justify-between items-center ">
            <div className="flex flex-col">
                <h1 className="text-sm text-gray-700">{value}</h1>
                <h1>{title}</h1>
            </div>
            <img className="h-10" src={imgURL} alt="" />
        </div>
    )


}