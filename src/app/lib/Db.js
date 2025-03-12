import mongoose from "mongoose";


const DBConnection = async ()=>{
    try{
        console.log(process.env.Database_URL)
       await mongoose.connect(process.env.Database_URL,{

            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
            socketTimeoutMS: 45000,
        })

        console.log("mongodb connected")
    }catch(error){
        console.log("mongodb error",error)
    }
}

export default DBConnection