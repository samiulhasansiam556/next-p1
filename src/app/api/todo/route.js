
import DBConnection from "@/app/lib/Db";
import TodoModel from "@/app/models/todo";
import { NextResponse } from "next/server";


export async function POST(request) {

    try{
        const {title,desc} = await request.json();

         if(!title || !desc ){
            return NextResponse.json({success:false,message:"All fields are required"},{status:400})
         }

         await DBConnection();
         const todo = TodoModel.create({title,desc})
         return NextResponse.json({success:true,message:"todo Create Successfully"},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({success:false,message:"Internal server error"},{status:500})
                
    }
    
}

export async function GET() {

    try{
        await DBConnection()
        const todos = await TodoModel.find()
        if(!todos){
           return NextResponse.json({success:false,message:" todos is not found"},{status:400})
        } 
        return NextResponse.json({success:true,message:`${todos.length} todos is found`,todos},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({success:false,message:"Internal server error"},{status:500})
                   
    }
    
} 