import React from 'react'
import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <div>
      {/* First Section */}
      <div className='md:p-5 md:mt-10 mt-32 flex justify-between items-center p-2'>
        <div className="tagline gap-2 flex flex-col p-4 md:w-[50%]">
          <h2 className='md:text-8xl text-7xl sm:text-6xl'>
            Stories & ideas that shape the world
          </h2>
          <p className='ms:text-2xl text-xl font-sans'>
            A space to explore, express, and expand your knowledge.
          </p>
          <Button className='font-sans mt-4 w-fit p-6'>Start Reading</Button>
        </div>
        <div className="image md:flex hidden">
          <img src="/image.webp" className='h-[550px]' alt="" />
        </div>
      </div>

      {/* Second Section */}
      <section className='mt-20 h-full mb-10 flex flex-col p-4 md:w-[50%] justify-center px-4'>
       <div>
       <h2 className='md:text-7xl text-6xl font-bold'>Discover New Perspectives</h2>
        <p className='text-sm md:text-2xl mt-4 max-w-3xl font-sans'>
          Engage with thought-provoking articles, insightful opinions, and in-depth analyses from writers worldwide.
        </p>
        <Button className='font-sans mt-4 w-fit p-6'>Explore Now</Button>
       </div>
      </section>
    </div>
  )
}

export default Page
