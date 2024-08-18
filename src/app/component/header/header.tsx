'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";
export default function Header() {
    const { data: session } = useSession();
    let imageOfUser = session?.user?.image;
    return (
        <header className="flex items-center justify-between w-full p-[10px]">
            <h1 className="text-[#FF725E] font-semibold text-lg">KM-Meter</h1>
            {/* <div>
                {
                    imageOfUser &&
                    <Image loader={() => `${imageOfUser}`} src={`${imageOfUser}`} width={100} height={100} alt="HeaderImage" className="w-[30px] h-[30px] rounded-[50%]" />
                }
            </div> */}
        </header>
    )
}