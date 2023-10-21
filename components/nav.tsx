import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
function Nav() {
  return (
    <div className='flex flex-row justify-between'>
        <p>E-Shagun</p>
        <ConnectButton chainStatus="icon"/>
    </div>
  )
}

export default Nav;