import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer(){
    return (
        <footer className="gap-3 w-full bg-blue-100 border-t p-5 md:p-10">
            

            <div className="border-b flex fles-col  md:flex-row gap-3  md:justify-between">
                <img className="  h-10" src="/demologo.png" alt="logo" />
                <div className="w-full flex flex-col justify-end md:flex-row gap-4">
                    <div className="flex gap-2 items-center">
                        <Phone size={12} className="text-blue-500"/>
                        <h2 className="text-sm text-gray-400">+91 980 XXXXXXX</h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Mail size={12} className="text-blue-500"/>
                        <h2 className="text-sm text-gray-400">testman@testmail.com</h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        {/* <MapPin /> */}
                        <MapPin size={12} className="text-blue-500"/>
                        <h2 className="text-sm text-gray-400">Abc Street</h2>
                    </div>
                </div>
            </div>


            <div className="flex justify-center w-full py-1">

                <h3 className="text-xs text-gray-700">
                    @ 2024 . All rights reserved by KING SRAKAR
                </h3>

            </div>


        
        </footer>
    )
}