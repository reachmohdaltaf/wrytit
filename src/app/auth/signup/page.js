'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";


const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const router = useRouter()
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSignUp = async (e)=>{
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/signup', formData)
      console.log(res.data)
      alert("Signup Successful")
      router.push('/auth/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" w-full h-screen md:mt-5 p-1 flex justify-center items-center rounded-3xl">
      <Card className="bg-transparent flex flex-col items-center border-none  gap-5  shadow-none w-96 p-4">
        <CardTitle className="text-4xl">Sign Up</CardTitle>
        <CardDescription className="w-full flex flex-col gap-3">
         <form onSubmit={handleSignUp} className="w-full flex flex-col gap-3">
         <Input
            value={formData.name}
            onChange={handleChange}
            name="name"
            placeholder="Enter Your Name"
            className="shadow-none border border-black rounded-3xl"
            type="text"
          />
          <Input
            placeholder="Enter Your Email"
            className="shadow-none border border-black rounded-3xl"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Enter Your Password"
            className="shadow-none border border-black rounded-3xl"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button>Sign Up</Button>
         </form>

          <Separator className="mt-4" />

          <Button
            variant="outline"
            className="flex bg-[#e7e4dd] text-[#242424] hover:bg-[#d3d0c9] items-center gap-2"
          >
            <FcGoogle size={20} /> Sign up with Google
          </Button>
          <Button
            variant="outline"
            className="flex bg-[#e7e4dd] text-[#242424] hover:bg-[#d3d0c9] items-center gap-2"
          >
            <FaGithub size={20} /> Sign up with GitHub
          </Button>
        </CardDescription>
        <CardFooter className="flex gap-3">
          Already have an Account?
          <Link className="text-green-800 font-bold" href="/auth/login">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
