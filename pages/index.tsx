import { NextPage } from 'next';
import React from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div  style={{ background: 'linear-gradient(to right, #434343 0%, black 100%)' }}>
      <h1 className='text-8xl flex-shrink font-mono text-slate-200 pt-20 px-10'>Revolutionize gifting with our decentralized<br/> red envelope distribution platform!</h1>
    <div className="flex flex-col justify-center items-center h-screen">
      <div className='pb-96'>
      <div className="flex justify-center ">
   
          <div className="flex justify-center px-20">
            <Link href="/create">
              <button className="  text-xl border-gray-400 h-20 w-80 font-mono shadow-2xl bg-opacity-25 rounded-2xl	bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4" >
                Create your Red Envelope
              </button>
            </Link>
          </div>
      

        
            <button className=" h-20 w-80 border-gray-400 text-xl bg-opacity-25 shadow-2xl font-mono bg-slate-800 rounded-2xl	 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">
              Dashboard
            </button>
            
          </div>
    </div>
    </div>
    </div>
  );
};

export default Home;