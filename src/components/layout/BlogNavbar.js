'use client'
import React, { useRef } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideFill } from 'react-icons/ri';

const categories = [
  "Following", "Featured", "Money", "Self Improvement",
  "Data Science", "Programming", "For You","For You","For You"
];

const BlogNavbar = () => {
  const navbarRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = React.useState(false);
  const [showRightButton, setShowRightButton] = React.useState(false);

  const checkScroll = () => {
    if (navbarRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navbarRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

  // Check on mount and when content changes
  React.useEffect(() => {
    checkScroll();
    // Add resize listener
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollLeft = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({ left: -90, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({ left: 90, behavior: 'smooth' });
    }
  };

  return (
    <nav className="  h-full md:px-6 flex justify-between items-end  w-full">
      <div className="w-[10px]">
        
        <button 
          onClick={scrollLeft} 
          className={`bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 transition-opacity duration-300 ${
            showLeftButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <RiArrowLeftWideLine size={25} className='text-gray-400 hover:text-black' />
        </button>
      </div>
      
      <ul 
        ref={navbarRef} 
        className="md:w-[90%] w-full text-gray-600 p-2 font-sans hide-scrollbar text-sm overflow-x-auto flex md:gap-10 gap-5 whitespace-nowrap px-4 scrollbar-hide"
        onScroll={checkScroll}
      >
        {categories.map((category, index) => (
          <li className="cursor-pointer hover:text-black" key={index}>{category}</li>
        ))}
      </ul>

      <div className="w-[10px]">
        <button 
          onClick={scrollRight}
          className={`bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 transition-opacity duration-300 ${
            showRightButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <RiArrowRightWideFill size={25} className='text-gray-400 hover:text-black' />
        </button>
      </div>
    </nav>
  );
};

export default BlogNavbar;
