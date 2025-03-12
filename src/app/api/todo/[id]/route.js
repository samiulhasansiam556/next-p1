import DBConnection from "@/app/lib/Db";
import TodoModel from "@/app/models/todo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function PUT(request,{params}) {

    try{
        // console.log(params)
        const {id} = params
        const data = await request.json()
        await DBConnection()
      
        const findtodo = await TodoModel.findById(id)

        if(!findtodo){
            return NextResponse.json({success:false,message:"Todo is not found"},{status:400})
        }
      
        const updateTodo = await TodoModel.findByIdAndUpdate(id,{$set:data},{new:true})
    
         return NextResponse.json({success:true,message:"Todo Update Successfully"},{status:200})


   
    }catch(error){
        console.log(error)
        return NextResponse.json({success:false,message:"Internal Server Error"},{status:500})
    }
    
}


export async function DELETE(request,{params}) {

    try{
        console.log(params)
        const id = params.id;

        await DBConnection()
        const todo = await TodoModel.findById(id)
        if(!todo){
            return NextResponse.json({success:false,message:"Todo is not found"},{status:400})

        }
 
        const deleteTodo = await TodoModel.findByIdAndDelete(id)
  
        return NextResponse.json({success:true,message:"Todo is Successfully Delete"},{status:200})
       

    }catch(error){
        console.log(error)
        return NextResponse.json({success:false,message:"Internal Server Error"},{status:500})

    }
    
}