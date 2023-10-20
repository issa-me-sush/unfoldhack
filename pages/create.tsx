import React, { useState } from 'react';
import { Input } from '../components/ui/input';

const Form = () => {
  const [checked, setChecked] = useState(false);
  const [addrarray, setAddrArray] = useState(['']);
  const [addr, setAddr] = useState('');
  const [name, setName] = useState('');
  const [maximumbounty, setMaximumBounty] = useState(null);
  const [bounty, setBounty] = useState(null);

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

  return (
    <div className='bg-gradient-to-r from-blue-100 to-blue-200 p-10 rounded-lg shadow-lg max-w-lg mx-auto mt-20'>
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
          <h3>Enter the Name of the Red Envelope</h3>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder='Satoshi Nakamoto'
            className='p-2 border rounded'
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <h3>Enter Bounty Value</h3>
          <Input
            onChange={(e) => setBounty(e.target.value)}
            placeholder='$ 1000'
            className='p-2 border rounded'
            type='number'
          />
        </div>
        {!checked ? (
          <div className='flex flex-col space-y-2'>
            <h3>Enter the Receiver address</h3>
            <ul className='space-y-2'>
              {addrarray.map((address, index) => (
                <li key={index} className='flex items-center space-x-2'>
                  <Input
                    value={address}
                    placeholder='0x588797393fu8393209'
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    className='p-2 border rounded flex-grow'
                  />
                  <button
                    onClick={() => {
                      const updatedArray = [...addrarray];
                      updatedArray.splice(index, 1);
                      setAddrArray(updatedArray);
                    }}
                    className='p-2 bg-red-500 text-white rounded'
                  >
                    X
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
      </div>
    </div>
  );
};

export default Form;