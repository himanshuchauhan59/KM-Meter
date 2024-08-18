"use client";
import React from 'react';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <h3 className='text-center font-semibold text-2xl text-[#FF725E] my-4'>KM-Meter</h3>
        <div>
          <Image src="/Scooter-pana.svg" width={100} height={100} className='w-screen h-full max-w-[400px]' alt='LoginPageImage' />
        </div>
        <div className='w-full px-5 flex items-center justify-center'>
          <button className='bg-[#FF725E] text-white w-full max-w-[400px] my-6 p-3 rounded-xl' onClick={() => {
            router.push('/Dashboard');
          }}>Hola Amigo</button>
          {/* {session && session.user ?
            <button className='bg-[#FF725E] text-white w-full max-w-[400px] my-6 p-3 rounded-xl' onClick={() => {
              router.push('/Dashboard');
            }}>You Are Already Login</button>
            :
            <button className='bg-[#FF725E] text-white w-full max-w-[400px] my-6 p-3 rounded-xl' onClick={() => {
              signIn();
            }}>Login With Google</button>} */}
        </div>
      </div>
    </>
  );
}
