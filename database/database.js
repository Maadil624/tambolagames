import mongoose from "mongoose";
let url='mongodb+srv://maadil624:Abc%40123@cluster0.aybbvl6.mongodb.net/?retryWrites=true&w=majority'
//we can implement this url in .env file for security but removed for your access..
const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(url)
            console.log("connected to mongoDB.....")
    }
    catch(err){
        console.log(`mongoDB err : ${err}`)
    }
}

export default connectDB