const express=require('express')
const mongoose=-require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
const UserModel=require('../model/user')

const router = express.Router()
router.post('/register', async(req,res)=>{
    const {username,password}=req.body;
    const user = await UserModel.findOne({username})
    if(user)
    {
        return res.status(404).json({message:'User Already Exist'})
    }
    const hashPassword= await bcrypt.hash(password,10)
    const newUser= new UserModel({username,password:hashPassword})
    await newUser.save()
    res.json({message:'User has been Registerd Successfully'})
})


router.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user = await UserModel.findOne({username})
    if (!user)
    {
        return res.status(404).json({message:'Invalid USer'}) 
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if (!isPasswordValid)
    {
        return res.status(404).json({message:'Wrong Password..'})
    }
    const token=jwt.sign({id:user._id},'secret')
    return res.status(200).json({token,userID:user._id,userName:user.username})
})
module.exports={router }
///export {router as UserRoutes}