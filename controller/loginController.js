import userModels from "../models/userModels.js"

export const loginController =async (req,res)=>{
    try{
        const {email,password}=req.body

        // email="shbc",password="xszx"
        console.log(email,password)
        if(!email||!password){
            res.status(400).send({
                sucess:false,
                message:"provide the login and pass"
            })
        }
        const user=await userModels.findOne({email,password})
        console.log(user)
        if(!user){
            res.status(400).send({
                sucess:false,
                message:"user r pass is wrong.."
            })
        }
        res.status(200).send({
            sucess:true,
            message:"login sucessfull.."
        })
    }
    catch(err){

    }
}