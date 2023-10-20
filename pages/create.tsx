
import React from 'react'
import { useState } from 'react'
import { Input } from '../components/ui/input';

const Form = () => {
    const [checked,setchecked] = useState(false);
    const [addrarray,setaddrarray] = useState(['']);
    const [addr,setaddr]=useState('');
    const [name,setName]=useState('');
    const [maximumbounty,setmaximumbounty] = useState(null);
    const [bounty,setBounty] = useState(null);
    const handlechange = ()=>{
        setchecked(!checked);
    }
  function addarr(e:any){
    addrarray.push(addr);
  }
  return (
    <div className='bg-gradient-to-r from-blue-100 to-blue-200 p-10 rounded-lg shadow-lg max-w-lg mx-auto mt-20'>
        <div className='flex flex-col space-y-4'>
            <h1 className='text-center font-bold text-xl'>{checked ? 'Public Envelope' : 'Private Envelope'}</h1>
            <label className="flex items-center space-x-2">
                <Input checked={checked} onChange={handlechange} type="checkbox" className='rounded'></Input>
                <span className="slider round"></span>
            </label>
            <div className='flex flex-col space-y-2'>
                <h3>Enter the Name of the Red Envelope</h3>
                <Input onChange={(e)=>setName(e.target.value)} placeholder='Satoshi Nakamoto' className='p-2 border rounded'></Input>
            </div>
            <div className='flex flex-col space-y-2'>
                <h3>Enter  Bounty Value</h3>
                {/* @ts-ignore */}
                <Input onChange={(e)=>setBounty(e.target.value)} placeholder='$ 1000' className='p-2 border rounded'  type='number'></Input>
            </div>
            {!checked?
            <div className='flex flex-col space-y-2'>
                <h3>Enter the Reciver address</h3>
                <div className='flex items-center space-x-2'>
                    <Input placeholder='0x588797393fu8393209' onChange={(e)=>setaddr(e.target.value)} className='p-2 border rounded flex-grow'></Input>
                    <button onClick={e=>addarr(e)} className='p-2 bg-blue-500 text-white rounded'>+</button>
                </div>
            </div>
                :<p className='text-center'>we will update soon...</p>}
        </div>
    </div>
  )
}

export default Form;