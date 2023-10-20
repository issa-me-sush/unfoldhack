
import React from 'react'
import { useState } from 'react'

const reactform = () => {
    const [checked,setchecked] = useState(false);
    const [addrarray,setaddrarray] = useState(['']);
    const [addr,setaddr]=useState('');
    const [name,setName]=useState('');
    const [maximumbounty,setmaximumbounty] = useState(null);
    const handlechange = ()=>{
        setchecked(!checked);
    }
  function addarr(e:any){
    addrarray.push(addr);
  }
  return (
    <div className='maincontainer'>
    <div className='formcontainer'>
        <div className='formcont1'>
        <h1>{checked ? 'Public Envelope' : 'Private Envelope'}</h1>
        <label className="switch">
            <input checked={checked} onChange={handlechange} type="checkbox"></input>
            <span className="slider round"></span>
        </label>
        </div>
        <div className='input-container'>
            <h3>Enter the Name of the Red Envelope</h3>
            <input onChange={(e)=>setName(e.target.value)} placeholder='Satoshi Nakamoto'></input>
            <h3>Enter the Name of the maximum bounty</h3>
{/* @ts-ignore */}
            <input onChange={(e)=>setmaximumbounty(e.target.value)} placeholder='$ 1000'></input>
            {!checked? 
            <div className='privatecont'>
                <h1>Enter the Reciver address</h1>
                <input placeholder='0x588797393fu8393209' onChange={(e)=>setaddr(e.target.value)}></input>
                <button onClick={e=>addarr(e)}>+</button>
            </div>
                :<p>we will update soon...</p>}
           
        </div>
        </div>
      


    </div>
  )
}

export default reactform