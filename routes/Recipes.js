const express=require('express')
const mongoose=-require('mongoose')
const fs=require('fs')
const RecipeModel=require('../model/recipe')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const recipe_router = express.Router()
//create a new recipe
recipe_router.post('/create',upload.single('files'),async(req,res)=>{
    //console.log(req.file)
    const {originalname,path}=req.file
    const parts=originalname.split('.')
    const ext=parts[parts.length-1]
    const new_path=path+'.'+ext
    fs.renameSync(path,new_path)
    
    const {name,ingrediants,instsruction,cookingTime,category,persons,userID}=req.body
    
    try
    {
    const reponse = await RecipeModel.create({name,ingrediants,instsruction,cookingTime,
                                        category,persons,
                                      imageUrl:new_path,userOwner:userID}) 
        res.json(reponse)
    }
    catch(err)
    {
        res.json(err)
    }
})
//All Recipes 
recipe_router.get('/allrecipes', async(req,res)=>{
    try {
        //const  docs= await Post.find().populate('author',['username'])
        const allrecipes = await RecipeModel.find().populate('userOwner',['username'])
       res.json(allrecipes)
       console.log("all recipes")
} catch(err){
    res.json(err)
}
})
//Single Recipe
recipe_router.get('/singlerecipe/:id',async(req,res)=>{
    const {id}=req.params
    console.log(id)
   try{
    const singlerecipe = await RecipeModel.findById(id).populate('userOwner',['username'])
    res.json(singlerecipe)
   } 
   catch(error){
    res.status(400).json({error:error.message})
}
})



module.exports= {recipe_router} 