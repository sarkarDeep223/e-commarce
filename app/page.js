

import { getFeaturedProduct, getProducts } from "../lib/firebase/products/read_server";
import { getFeaturedCollection } from "../lib/firebase/collections/read_server"
import { getCategorys } from  "../lib/firebase/categories/read_server"
import Header from "./components/Header";
import FeatureProductSlider from "./components/Sliders"
import Collections from "./components/Collection";
import Categories from "./components/Categories"
import ProductsGridView from "./components/ProductsGrid"
import CustomerReviews from "./components/CustomerReviews"
import Footer from "./components/Footer";
import AuthContextProvider from "../contexts/AuthContext";


export default async function Home() {

  const featuredProducts = await getFeaturedProduct()
  const featuredCollection = await getFeaturedCollection()
  const categorys = await getCategorys()
  const products = await getProducts()



  return (
    <main className=" w-screen ">
        <AuthContextProvider>
          <Header/>
        </AuthContextProvider>
        <FeatureProductSlider featuredProducts={featuredProducts}/>
        <Collections featuredCollection={featuredCollection}/>
        <Categories categorys={categorys}/>
        <ProductsGridView products={products}/>
        <CustomerReviews/>
        <Footer/>

    </main>
  );
}
