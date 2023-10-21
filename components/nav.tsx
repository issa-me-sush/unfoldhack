import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BMCONTRACT,BMABI ,PRIVABI,PRIVCONTRACT,PUBCONTRACT,PUBABI} from '@/contracts/abi';
import { ethers } from 'ethers';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useIsMounted } from '../hooks/useIsMounted';
function Nav() {
  const {isConnected,address} = useAccount();
  const mounted = useIsMounted();
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  const contract = new ethers.Contract(PRIVCONTRACT,PRIVABI,provider);
  const contractpub = new ethers.Contract(PRIVCONTRACT,PRIVABI,provider);
  const [credits,setCredits] = useState(null)
  const [creditsPub,setCreditsPub] = useState(null)
  useEffect(() => {
    async function check(){

        try {
            const check = await contract.userBalances(address);
            const checkpub = await contractpub.userBalances(address);
            console.log(check)
            // @ts-ignore 
        console.log(parseInt(check._hex,16))
         // @ts-ignore 
            setCredits(parseInt(check._hex,16)/10**18)
            // @ts-ignore
            setCreditsPub(parseInt(checkpub._hex,16)/10**18)
           
            
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
          <div className='text-center'>credits private:{credits != null ?credits:"-"}</div>
          <div className='text-center'>credits public:{creditsPub != null ?creditsPub:"-"}</div>
        <ConnectButton chainStatus="icon"/>
        </div>
    </div>
  )
}

export default Nav;