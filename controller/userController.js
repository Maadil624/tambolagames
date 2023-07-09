import userModels from "../models/userModels.js"

export default async function userController(req,res){
    // console.log("hello....",req.body)
    //3 tasks to-do validate,check stored data,store
    try{
        // fetchinvg data from frontend 
        const {name,email,password}=req.body
        // validate
        if(!name){
            return res.status(400).send({sucess:false,message:"please provide the name"})
        }
        if(!password){
            return res.status(400).send({sucess:false,message:"please provide the password"})
        }
        if(!email){
            return res.status(400).send({sucess:false,message:"please provide the e-mail"})
        }
        // email validation of exixting
        const extuser=await userModels.findOne({email})
        if(extuser){
           return res.status(200).send({
            sucess:true,
            message:"email is already there"
           }) 
        }

        // storing data
        // using object creation and passing
        const newuser={
            name,email,password
        }
        // console.log("hello....")
        const user=await userModels.create(newuser)
        res.status(200).send({
            sucess:true,
            message:"user created sucessfully.....",
            user
        })

    }catch(err){
        res.status(400).send({
            sucess:false,
            err,
            message:"user contrl error"
        })

    }

}