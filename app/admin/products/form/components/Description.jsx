"use client"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


export default function Description({data,handelData}){





    const handelChange=(value)=>{
        handelData('content',value)
    }


    return(
        <section className="bg-white border p-4 rounded-xl flex flex-col gap-3 ">
            <h1 className="font-semibold">Description</h1>

            {/* <div className='w-full'> */}
                <CKEditor
                    editor={ClassicEditor}
                    data={data?.content ?? ""}
                    onChange={(event, editor) => {
                    const data = editor.getData();
                    handelChange(data);
                    }}
                />
            {/* </div> */}
        </section>
    )
}


