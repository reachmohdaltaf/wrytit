'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";

const page = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: ""
  })
 
  const router = useRouter()

  const handChange = (e)=>{
    setFormData({...FormData, [e.target.name]: e.target.value})
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/login', FormData);
      console.log(res.data);
      router.push('/dashboard')

    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };
  

 
  return (
    <div className="w-full h-screen mt-10 md:mt-5 p-1 flex justify-center items-center rounded-3xl">
      <Card className="bg-transparent flex flex-col items-center border-none  gap-5 shadow-none w-96 p-4">
        <CardTitle className="text-4xl">Login</CardTitle>
        <CardDescription className="w-full flex flex-col gap-3">
         <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
         <Input
            placeholder="Enter Your Email"
            className="shadow-none border  border-black rounded-3xl"
            type="email"
            name='email'
            value={FormData.email}
            onChange={handChange}
          />
          <Input
            placeholder="Enter Your Password"
            className="shadow-none border  border-black rounded-3xl"
            type="password"
            name='password'
            value={FormData.password}
            onChange={handChange}
          />
          <Button>Login</Button>
         </form>

          <Separator className="mt-4" />

          <Button variant="outline" className="flex bg-[#e7e4dd] text-[#242424] hover:bg-[#d3d0c9] items-center gap-2">
            <FcGoogle size={20} /> Login with Google
          </Button>
          <Button variant="outline" className="flex bg-[#e7e4dd] text-[#242424] hover:bg-[#d3d0c9] items-center gap-2">
            <FaGithub size={20} /> Login with GitHub
          </Button>
        </CardDescription>
        <CardFooter className='flex gap-3'>Not have an account ?<Link className="text-green-800 font-bold" href='/auth/signup'>Sign Up</Link></CardFooter>
      </Card>
    </div>
  );
};

export default page;
