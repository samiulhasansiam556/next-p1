'use client'

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const Page = () => {
  
  
   const serverurl = process.env.NEXT_PUBLIC_Server_URL

   const router = useRouter();
    const [todo,setTodo] = useState({
        title : "",
        desc : ""
    })

    const handlechange = (e) =>{
       setTodo({
        ...todo,[e.target.name]:e.target.value
       })
    }

    const handleSubmit = async ()=>{
        const request = await axios.post(`${serverurl}/api/todo`,todo)     
        if(request.status != 200 ){
          toast.success(request.data.message)
        } 
        
        toast.success(request.data.message)
        router.push('/')
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] sm:w-[50%] p-6 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <Link href="/">
            <IoArrowBack size={25} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-blue-600">Add Your Task</h1>
        </div>

        {/* Form */} 
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Todo Title:</label>
            <input
             name= "title"
             value={todo.title}
             onChange={(e)=>  handlechange(e)}
              type="text"
              placeholder="Enter your task title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Todo Description:</label>
            <input
             name= "desc"
             value={todo.desc}
             onChange={(e)=>  handlechange(e)}
              type="text"
              placeholder="Enter your task description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add Button */}
          <button

          onClick={()=>handleSubmit()}
          
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200">
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
