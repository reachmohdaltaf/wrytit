'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Input } from '../ui/input'
import { CiSearch } from "react-icons/ci"
import { RiNotification2Line } from "react-icons/ri"
import axiosInstance from '@/app/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaPencilAlt } from "react-icons/fa"
import { User2, Library, Notebook, BarChart, Settings, HelpCircle, LogOut } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DashboardNavbar = () => {
  const [searchResponse, setSearchResponse] = useState([])
  const [mobileSearch, setMobileSearch] = useState(false)
  const inputRef = useRef(null)
  const searchRef = useRef(null) // Reference for search box
  const router = useRouter()

  const signOut = async () => {
    try {
      await axiosInstance.post('/auth/logout')
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    const query = e.target.value.trim()
    if (!query) {
      setSearchResponse([])
      return
    }

    try {
      const response = await axiosInstance.get(`/posts/search?q=${query}`)
      setSearchResponse(response.data)
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const handleMobileSearch = (e) => {
    e.preventDefault()
    setMobileSearch(!mobileSearch)
  }

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResponse([]) // Close the search dropdown
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className='px-3 items-center border py-3 bg-white flex justify-between'>

      {/* Left Side - Logo & Search */}
      <div className='flex h-full items-center gap-6'>
        <Link href='/dashboard' className="text-3xl font-extrabold cursor-pointer">Wrytit</Link>

        {/* Search Box */}
        <div ref={searchRef}> {/* Wrap this div with ref */}
          <form onSubmit={handleSearch}>
            <div className='relative items-center h-12 rounded-3xl px-4 hidden md:flex w-60 bg-[#F9F9F9]'>
              <CiSearch size={30} />
              <Input 
                ref={inputRef} 
                autoComplete="off"
                name='search' 
                placeholder='Search...' 
                className='border-none outline-none shadow-none ring-0 focus:ring-0 h-full'
                onChange={handleSearch} 
              />
            </div>

            {/* Search Results Dropdown */}
            {searchResponse.length > 0 && (
              <div className='absolute z-50 mt-2 w-96 p-4 bg-white border-2 border-gray-300 rounded-md flex flex-col '>
                {searchResponse.map((post) => (
                  <Link key={post._id} href={`/posts/${post._id}`} className='p-2 hover:bg-gray-100 whitespace-nowrap text-ellipsis overflow-hidden rounded-md'>
                    {post.title}
                  </Link>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      {mobileSearch && (
        <div className='absolute w-32 z-20 bg-white'>
          <input type="text"  className='bg-gray-100 p-4 w-full outline-none shadow-none ring-0 focus:ring-0 h-full ' />
        </div>
      )}

      {/* Right Side - Icons & Profile Dropdown */}
      <div className='flex gap-5 items-center'>
        <Link href='/dashboard/write' className="text-[#242424] flex"><FaPencilAlt size={20} /></Link>
        <div className="flex cursor-pointer text-[#242424] md:hidden"><CiSearch onClick={handleMobileSearch} size={25} /></div>
        <Link href='/' className="text-[#242424]"><RiNotification2Line size={25} /></Link>

        <DropdownMenu>
          <DropdownMenuTrigger className='border-none outline-none'>
            <div className="h-12 w-12 border flex items-center justify-center rounded-full transition">
              <User2 className="h-5 w-5 text-gray-700" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mr-4 w-72 h-72 cursor-pointer overflow-y-auto rounded-lg shadow-lg border bg-white">
            <DropdownMenuLabel className="text-gray-800 p-3 font-semibold">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Menu Items */}
            <div className="flex flex-col gap-1">
              <Link href='/dashboard/profile'>
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-md">
                  <User2 className="h-4 w-4" /> Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-md">
                <Notebook className="h-4 w-4" /> Stories
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-md">
                <BarChart className="h-4 w-4" /> Stats
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            {/* Settings & Logout */}
            <div className="flex flex-col gap-1">
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-md">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-md">
                Refine recommendations
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-md">
                Manage publications
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-md">
                <HelpCircle className="h-4 w-4" /> Help
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-md">
                <LogOut className="h-4 w-4" /> Logout
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default DashboardNavbar
