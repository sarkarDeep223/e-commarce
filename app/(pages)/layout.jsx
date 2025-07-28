import AuthContextProvider from "../../contexts/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({children}){
    return (
        <main>
            <AuthContextProvider>
                <Header/>
                    {children}
                <Footer/>
            </AuthContextProvider>
        </main>
    )
}