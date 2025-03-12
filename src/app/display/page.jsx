'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


export default function page() {

    const serverurl = process.env.NEXT_PUBLIC_Server_URL
    const {push} = useRouter();
    const [todos,setTodos] = useState([])
    const [refresh,setRefresh] = useState (false)
      

    useEffect(()=>{
        async function getTodo() {
            const todos = await axios.get(`${serverurl}/api/todo`)
             todos.data.todos && todos.data.todos.length>0 ? setTodos(todos.data.todos) : setTodos([])                  
        }
        getTodo()
    },[refresh])


    const handleDelete = async (id) => {
      try {
        const request = await axios.delete(`${serverurl}/api/todo/${id}`);
    
        // This only executes if status is 200 (successful delete)
        toast.success(request.data.message);
        setRefresh(!refresh);
      } catch (error) {
        console.log(error);
    
        // Check if the error has a response (means request was made but returned an error status)
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    };
    

      
       

   const handleEdit = async(id) =>{
        const todo = todos.filter((ele)=> ele._id == id)
        localStorage.setItem("todo",JSON.stringify(todo))
          push(`/edit/${id}`)
          
      }
 
 
    return (
    <div> 
        <div>          
            <h1 className='text-center mt-11 font-bold text-2xl text-blue-500 font-serif'>Make Your Todo</h1>

            <div className='w-[80%] sm:w-[50%] mx-auto bg-amber-50 px-4
                  pt-5 mt-10'>

                 <div className='flex justify-between'>
                    <h1 className='text-xl text-red-500 font-semibold '>Todo List</h1>
                    <button className='bg-black text-white px-2 py-1 rounded-md' ><Link href='/add'>Add Todo</Link></button>
                 </div>

                 {
                    todos && todos.map((element)=>{

                        return(
                            <div key={element._id} className='flex justify-between mt-5 bg-gray-500 px-2 py-3 shaddow shadow-black'>
                  
                            <div className='text-white'>
                              <h2 className=''>{element.title}</h2>
                              <h2> {element.desc} </h2>
                            </div>
          
                            <div className='px-2  flex flex-col gap-2'>
                              <FaEdit 
                                onClick={()=> handleEdit(element._id)}
                              size={22} className='text-green-500 '/>
                              <MdDeleteForever
                              onClick={()=> handleDelete(element._id)}
                              size={22} className='text-red-400 ' />
                            </div>
          
                          </div>
          
                        )

                    })
                 }

              
             
            </div>
        </div>
    
    </div>
  )
}
