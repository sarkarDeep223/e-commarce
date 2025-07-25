import { getCategory } from "../../../../lib/firebase/categories/read_server";
import { getProductsByCategory } from "../../../../lib/firebase/products/read_server";
import { ProductCard } from "../../../components/ProductsGrid"
export default async function Page({params}){
    const {categoryId } = await params;
    const products = await getProductsByCategory({categoryId:categoryId})
    const category = await getCategory({id:categoryId}) 
    return (
        <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
            <div className=" flex flex-col gap-6 max-w-[900px] p-5">
                <h1 className="text-center font-semibold text-4xl"> {category.name} </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-self-center justify-center items-center gap-4 md:gap-5">
                    {products?.map((item)=>{
                        return (
                            <ProductCard product={item} key={item?.id}/>
                        )
                    })}
                </div>
            </div>
        </main>
    )

}