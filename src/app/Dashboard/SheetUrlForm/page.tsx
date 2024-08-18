'use client';
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createSheetApi } from "@/app/api/sheetApi/createSheet";
import Swal from 'sweetalert2'
import { Bars } from "react-loader-spinner";
const SheetUrlForm = () => {
    const router = useRouter();
    let sheetUrl = useRef('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        sheetUrl.current = window.localStorage.getItem("sheetUrl") || "";
        console.log(sheetUrl.current)
    }, [])

    const handleSubmit = () => {
        setIsLoading(true)
        window.localStorage.setItem('sheetUrl', sheetUrl.current);
        createSheetApi(sheetUrl.current).then((isCreateSheet: any) => {
            console.log(isCreateSheet)
            if (isCreateSheet["success"]) {
                setIsLoading(false)
                Swal.fire({
                    icon: "success",
                    title: "Sheet Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    router.push('/Dashboard');
                })
            } else {
                setIsLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Try Again!",
                    text: isCreateSheet["message"]
                });
            }
        });
    }
    return (
        <div className='flex flex-col items-center justify-center'>
            <Image src='/form-image.svg' alt="" className="w-screen h-full max-w-[400px] my-4" width={100} height={100} />
            <div className="w-full max-w-[400px] ">
                <p className="text-sm my-2 px-2 text-gray-500">Attach sheet url</p>
                <form onSubmit={(e) => {
                    e.preventDefault();
                }} className="flex flex-col items-center justify-center px-2">
                    <input type='text'
                        onChange={(e) => { sheetUrl.current = e.target.value; console.log(sheetUrl.current); }}
                        defaultValue={sheetUrl.current}
                        placeholder="Enter your sheet url"
                        className="w-full border border-[#FF725E] rounded-[5px] p-2 text-sm" />
                    <button className="bg-[#FF725E] text-white w-full my-6 p-3 rounded-xl" onClick={() => {
                        handleSubmit();
                    }}>Submit</button>
                </form>
            </div>
            {
                isLoading &&
                <div className="bg-[#FFFFFF70] w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
                    <Bars
                        height="80"
                        width="80"
                        color="#FF725E"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            }
        </div>
    )
}

export default SheetUrlForm;