import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='px-6 md:px-10 py-4 border flex justify-between items-center border-r-0 border-l-0 border-black bg-[#F7F4ED]'>
       <div className="logo text-4xl text-[#242424] font-bold leading-tight"><Link href='/'>Wrytit</Link> </div>
      <div className='flex items-center gap-4'>
      <ul className="label gap-5 hidden cursor-pointer sm:hidden md:flex">
        <li className='font-serif'>Our Story</li>
        <li className='font-serif'>Membership</li>
        <li className='font-serif'>Write</li>
      </ul>
       <div className="auth flex items-center gap-3 justify-center">
       <Link href="auth/login"><button className=' hidden sm:flex font-serif'>Sign in</button></Link> 
        <Link href="auth/signup"><Button>Get Started</Button></Link>
       </div>
      </div>
    </nav>
  )
}

export default Navbar
