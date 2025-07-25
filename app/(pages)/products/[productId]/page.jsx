import { getProduct } from "../../../../lib/firebase/products/read_server";

import Photos from "./components/Photos"
import Details from "./components/Details"
import Reviews from "./components/Reviews"
import RelatedProduts from "./components/RelatedProduts"


export default async function Page({params}){

    const {productId} = await params;
    const product = await getProduct({id:productId})


    return(
        <main className="p-5 md:p-10">

            {/* photo,Details */}
            <section className="flex flex-col md:flex-row gap-5">
                <Photos imageList={[product?.featureImageUrl,...(product?.imageUrlList)]}/>
                <Details product={product}/>
            </section>
            <Reviews/>
            <RelatedProduts categoryId={product?.categoryId}/>

            {/* <h1>{product.title}</h1> */}
        </main>
    )
}