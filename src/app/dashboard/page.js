import BLogCard from "@/components/BlogCard";
import BlogNavbar from "@/components/layout/BlogNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HandHeart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaRegComment } from "react-icons/fa";

const blogPosts = [
  {
    title: "Bye Bye, Spotify",
    description: "And see ya later, all you subscription services in my little empire",
    date: "Aug 20, 2025",
    image: "/spotify.webp",
  },
  
];


const page = () => {
  return (
    <div className="flex h-full w-full justify-center bg-[#FFFFFF]">
      {/* Blog Container */}
      <div className="blog flex flex-col  items-center h-full w-full md:w-[90%] lg:w-[70%] border">
        {/* Navbar */}
        <header className="sticky top-0 z-1 border-b bg-white px-4 w-full flex items-center py-3">
          <BlogNavbar />
        </header>
        <BLogCard />
       
      </div>

    {/* Trending Section */}
<div className="trending relative  w-[30%] sm:hidden flex-col lg:flex hidden">
  {/* First Card */}
  <Card className="shadow-none border rounded-none">
    <CardContent className="py-4">
      <CardTitle className="font-sans">
        <h1 className="text-2xl font-bold font-sans">Staff Picks</h1>
      </CardTitle>
    </CardContent>
    <CardContent className="flex flex-col font-sans gap-4">
      {blogPosts.map((post, index) => (
        <div key={index} className="flex cursor-pointer flex-col">
          <p className="text-sm font-bold">{post.title}</p>
          <p className="text-sm text-gray-500  whitespace-nowrap overflow-hidden text-ellipsis">{post.description}</p>
        </div>
      ))}
    </CardContent>
  </Card>

  {/* Second Sticky Card */}
 <div className="sticky top-0">
 <Card className="shadow-none bg-gray-100 rounded-none p-4 flex flex-col gap-4 border-none">
    <CardContent className="p-4 flex flex-col gap-4">
      <CardTitle className="font-sans">
        <h1 className="text-2xl font-bold">Be a Member</h1>
      </CardTitle>
      <CardDescription className="text-sm text-gray-500">
        Get access to exclusive content and early access to new posts.
      </CardDescription>
      <Button className="w-full">
        Join Now
      </Button>
    </CardContent>
  </Card>
 </div>
</div>

     
    </div>
  );
};

export default page;
