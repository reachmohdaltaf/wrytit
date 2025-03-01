"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  Delete,
  DeleteIcon,
  DotSquare,
  EllipsisVertical,
  HandHeart,
  Share,
  Share2,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaRegComment } from "react-icons/fa";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CiInstagram, CiTwitter } from "react-icons/ci";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { Button } from "./ui/button";

const BLogCard = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/posts");
        setBlogPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, []);

  const deletePost = async (postId) => {
    try {
      const response = await axiosInstance.delete(`/posts/${postId}`);
      console.log("Post deleted:", response.data);

      // UI se deleted post remove karna
      setBlogPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      {/* Blog Content */}
      {blogPosts.map((post, index) => (
        <div key={index} className="blogs w-full border-b flex md:p-4">
          {/* Blog Card */}
          <Card className="shadow-none md:px-10 font-sans border-none w-full h-full rounded-none">
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <Image
                  src={post.author?.profilePic || "/images.png"}
                  alt=""
                  width={24}
                  className="rounded-full"
                  height={24}
                />
                <p className="text-xs">{post.author.name}</p>
                <p className="text-xs">{new Date(post.createdAt).toLocaleString()}</p>
              </CardDescription>
              <CardTitle className="">
                <h1 className="text-lg cursor-pointer font-bold md:text-2xl">{post.title}</h1>
              </CardTitle>
              <CardDescription className="text-sm w-32 md:w-96 overflow-hidden w whitespace-nowrap text-ellipsis  md:text-lg">
                {post?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardFooter className="w-full px-0">
                <ul className="flex items-center gap-5 text-sm md:text-lg">
                  <li className="cursor-pointer text-gray-600 hover:text-black">
                    <HandHeart />
                  </li>
                  <li className="cursor-pointer text-gray-600 hover:text-black">
                    <FaRegComment size={20} />
                  </li>
                      <li>
                        <Share2 />
                      </li>
                </ul>
              </CardFooter>
            </CardContent>
          </Card>

          {/* Blog Image */}
          <div className="flex flex-col gap-2  justify-start mr-3  items-center ">
            <div className="w-full flex justify-end">
              <DropdownMenu className="outline-none">
                <DropdownMenuTrigger className="outline-none">
                  {" "}
                  <Button
                    variant="outline"
                    className="px-1 rounded-none shadow-none border-none bg-transparent"
                  >
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="md:mr-28  mr-5">
                  <DropdownMenuItem onClick={() => deletePost(post._id)}>
                    <Trash /> Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Image
              src={"/images.png"}
              className=" object-contain"
              alt={post.title}
              width={150}
              height={100}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default BLogCard;
