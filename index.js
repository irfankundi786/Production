const express = require('express');
require('dotenv').config()
const PORT = process.env.PORT || 3000
const cors=require('cors')
const path = require("path");
const app=express()
const mongoose=require('mongoose')
const url=process.env.dburl
const {router} = require('./routes/Users')
const {recipe_router}=require('./routes/Recipes')
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
   console.log(req.path,req.method)
   next()
})
//app.use(cors({credentials:true,origin:'http://127.0.0.1:5173'}));

//new code
const connectDB = async () => {
   try {
     const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log(`MongoDB Connected: ${conn.connection.host}`);
   } catch (error) {
     console.log(error);
     process.exit(1);
   }
 }
//static files
app.use(express.static(path.join(__dirname, "./FrontEnd/food/dist")));
app.get("*", function (req, res) {
  try{
   res.sendFile(path.join(__dirname, "./FrontEnd/food/dist/index.html"));
  } 
  catch(error)
  {
   res.status(500).send(error)
  }  
});
app.use('/auth',router)
app.use('/recipe',recipe_router)
//connect to databasecd ..
connectDB().then(() => {
   app.listen(PORT, () => {
       console.log("listening for requests");
   })
})
  .catch((error)=>
  {console.log(error)})
  
  //end database portion