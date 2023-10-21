import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BMCONTRACT,BMABI } from '@/contracts/abi';
import { ethers } from 'ethers';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useIsMounted } from '../hooks/useIsMounted';
function Nav() {
  const {isConnected,address} = useAccount();
  const mounted = useIsMounted();
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  const contract = new ethers.Contract(BMCONTRACT,BMABI,provider);
  const [credits,setCredits] = useState(null)
  useEffect(() => {
    async function check(){

        try {
            const check = await contract.userBalances(address);
            console.log(check)
            // @ts-ignore 
        console.log(parseInt(check._hex,16))
         // @ts-ignore 
            setCredits(parseInt(check._hex,16))
           
            
          } catch (error) {
            console.error('Error:', error);
          }

}
if(address )
  check();
  }, [address]);
  return (
    <div className='flex flex-row justify-between h-[60px] items-center p-[10px] bg-opacity-20 bg-white backdrop-blur-md border border-gray-200 rounded'>
     <Link href="/"> 
{mounted?
     <h1 className=''>
       
          <img src="https://see.fontimg.com/api/renderfont4/Gg5D/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/RS1TaGFndW4/samarkan-normal.png" alt="Hindi fonts" />
        
      </h1>:""}
      </Link>   
        <div className='flex flex-row gap-[1rem]   '>
          {/* <div className='text-center'>credits:{credits != null ?credits:"-"}</div> */}
        <ConnectButton chainStatus="icon"/>
        </div>
    </div>
  )
}

export default Nav;