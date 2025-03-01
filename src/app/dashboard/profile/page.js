'use client'

import React, { useEffect, useState } from 'react'
import axiosInstance from '@/app/utils/axiosInstance'
import Image from 'next/image'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/auth/user/profile')
        setUser(response?.data?.user)
      } catch (error) {
        setError(error?.response?.data?.message || 'Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (isLoading) {
    return <p className="text-center text-xl font-bold">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>
  }

  return (
    <div className=" p-6 bg-white shadow-md rounded-lg flex flex-col border justify-around h-full py-32 md:py-40 gap-10 items-center lg:flex-row lg:items-center ">
      {/* Profile Picture */}
      <div className="relative w-40 h-40 border-4 border-black rounded-full overflow-hidden">
        <Image 
          src={user?.profilePic || '/default-profile.png'} 
          alt="Profile Picture" 
          layout="fill" 
          objectFit="cover" 
        />
      </div>
      
      {/* Profile Details */}
      <div className="flex flex-col gap-3 text-center lg:text-left">
        <h1 className="text-3xl font-bold text-gray-800 uppercase">{user?.name || 'Guest User'}</h1>
        <p className="text-lg text-gray-600">Email: {user?.email || 'Not Available'}</p>
        <p className="text-lg text-gray-600">Joined: {new Date(user?.createdAt).toLocaleDateString()}</p>
        
        <button className="mt-4 bg-black hover:bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default ProfilePage