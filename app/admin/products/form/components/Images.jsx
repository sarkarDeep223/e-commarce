
"use client"

export default function Images({data,featureImage,setFeatureImage,imageList,setImageList}){


    return(

        <section className="bg-white border p-4 rounded-xl flex flex-col gap-3">

            <h1 className="font-semibold">Images</h1>


            <div  className="flex flex-col gap-1">

               {featureImage && <div className="flex justify-center">
                   <img className="h-20 object-cover rounded-lg" src={URL.createObjectURL(featureImage)} alt="" />
               </div>}


                <label htmlFor="product-feature-image" className="text-gray-500 text-xs">
                    Feature Image
                    <span className="text-red-500">*</span>
                </label>
                <input  type="file" id="product-feature-image" name="product-feature-image" className="border px-3 py-4 rounded-lg w-full outline-none"
                onChange={(e)=>{
                    if(e.target.files.length > 0){
                        setFeatureImage(e.target.files[0])
                    }
                }}
                />
            </div>

            <div  className="flex flex-col gap-1">

                {imageList?.length > 0 && <div className="flex flex-wrap gap-3 " >
                        {imageList?.map((item,index)=>{
                           return <img className="w-20 object-cover rounded-lg" src={URL.createObjectURL(item)} alt="" key={index}/>
                        })}
                    </div>}


                <label htmlFor="product-images" className="text-gray-500 text-xs">
                    Images
                    <span className="text-red-500">*</span>
                </label>
                <input  type="file" multiple id="product-images" name="product-images" className="border px-3 py-4 rounded-lg w-full outline-none"
                onChange={(e)=>{
                    const newFiles = []

                    for (let i=0;i <e.target.files.length;i++){
                        newFiles.push(e.target.files[i])
                    }
                    setImageList(newFiles)
                }}
                />
            </div>


        </section>


    )


}