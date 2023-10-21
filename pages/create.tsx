import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import { ethers } from 'ethers';
import {PRIVCONTRACT ,PRIVABI}from "../contracts/abi"
import { sign } from 'crypto';
import { useAccount } from 'wagmi';
const Form = () => {
  const [checked, setChecked] = useState(false);
  const [addrarray, setAddrArray] = useState(['']);
  const [addr, setAddr] = useState('');
  const [name, setName] = useState('');
  const [maximumbounty, setMaximumBounty] = useState(null);
  const [bounty, setBounty] = useState(null);
 const {isConnected ,address} = useAccount();


//     const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
//     const signer = provider.getSigner();
// //   @ts-ignore
// const contract = new ethers.Contract(PRIVCONTRACT,PRIVABI,signer);

const [contract, setContract] = useState(null);

useEffect(() => {
    // @ts-ignore 
  if (typeof window.ethereum !== 'undefined') {
      // Create a Web3Provider, which wraps the Ethereum-compatible JavaScript object
    //   @ts-ignore 
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Request the user's accounts
    //   @ts-ignore 
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
          // Get the signer
          const signer = provider.getSigner();

          // Now use the signer to interact with the contract
          const contractInstance = new ethers.Contract(PRIVCONTRACT, PRIVABI, signer);

          // Update state with the contract instance
        //   @ts-ignore 
          setContract(contractInstance);
          
          // Now you can call methods on `contract` to interact with your smart contract.
        //   @ts-ignore 
      }).catch(error => {
          console.error('User denied account access');
      });
  } else {
      console.error('No Ethereum-compatible browser detected');
  }
}, []); 

async function fetchConstant() {
    // @ts-ignore 
    if(contract){
        // @ts-ignore 
    const creatorRewardPercentage = await contract.privateEnvelopes(0);
    console.log('Creator Reward Percentage:', creatorRewardPercentage.toString());
}
  }
  
  fetchConstant();


  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleAddressChange = (index: number, value: string) => {
    const updatedArray = [...addrarray];
    updatedArray[index] = value;
    setAddrArray(updatedArray);
  };

  const handleAddAddress = () => {
    setAddrArray([...addrarray, '']);
  };
  async function onSubmit(e:any){
    e.preventDefault();
    // @ts-ignore
    try {
    // @ts-ignore 
        const valueToSend = ethers.utils.parseEther(bounty);  // Sending 1 ether
    
        // Send transaction
        // @ts-ignore 
        const tx = await contract.createPrivateEnvelope(name, addrarray, { value: valueToSend });
        console.log('Transaction sent:', tx.hash);
    
        // Wait for transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction confirmed');

     // @ts-ignore 
         const currentid = await contract.currentEnvelopeId();
         console.log(currentid)
//   @ts-ignore 
         window.alert(`your envelope claim link for all the recipients: localhost:3000/privenvelopes/`+ parseInt( currentid._hex ,16 ));
      } catch (error) {
        console.error('Error:', error);
      }
  }

  return (
    <div className='h-screen p-60'  style={{ background: 'linear-gradient(to right, #434343 0%, black 100%)' }}    >
    <div className='bg-gradient-to-r bg-slate-600 bg-opacity-30 p-10 rounded-lg shadow-lg max-w-lg mx-auto font-mono'>
      <div className='flex flex-col space-y-4'>
        <h1 className='text-center font-bold text-xl'>
          {checked ? 'Public Envelope' : 'Private Envelope'}
        </h1>
        <label className='flex items-center space-x-2'>
          <Input
            checked={checked}
            onChange={handleCheckboxChange}
            type='checkbox'
            className='rounded'
          />
          <span className='slider round'></span>
        </label>
        <div className='flex flex-col space-y-2'>
          <h3 className='text-white'>Enter the Name of the Red Envelope</h3>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder='Satoshi Nakamoto'
            className='p-2 border rounded'
          />
        </div>
        <div className='flex flex-col space-y-2 text-white'>
          <h3>Enter Bounty Value</h3>-
          
          <Input
        //   @ts-ignore
            onChange={(e) => setBounty(e.target.value)}
            placeholder='$ 1000'
            className='p-2 border rounded text-black'
            type='number'
            
          />
        </div>
        {!checked ? (
          <div className='flex flex-col space-y-2 text-white'>
            <h3>Enter the Receiver address</h3>
            <ul className='space-y-2'>
              {addrarray.map((address, index) => (
                <li key={index} className='flex items-center space-x-2'>
                  <Input
                    value={address}
                    placeholder='0x588797393fu8393209'
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    className='p-2 border rounded flex-grow text-black'
                    
                  />
                  <button
                    onClick={() => {
                      const updatedArray = [...addrarray];
                      updatedArray.splice(index, 1);
                      setAddrArray(updatedArray);
                    }}
                    className='p-2 bg-red-500 text-white rounded w-10 rounded-xl'
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleAddAddress}
              className='p-2 bg-blue-500 text-white rounded'
            >
              Add Address
            </button>
          </div>
        ) : (
          <p className='text-center'>we will update soon...</p>
        )} 
        <button className='p-2 bg-zinc-300 text-black rounded-xl m-32' onClick={(e)=>onSubmit(e)}> Submit</button>
      </div>
    </div>
    </div>
  );
};

export default Form;