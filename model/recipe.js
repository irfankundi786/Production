const mongoose = require('mongoose')
const RecipesSchema = new mongoose.Schema({
    name:{type:String},
    ingrediants:[{type:String}],
    instsruction :{type:String},
    imageUrl:{type:String},
    cookingTime:{type:Number},
    category :{type:String},
    persons:{type:Number},
    userOwner:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    
},{timestamps:true})
 const RecipeModel =mongoose.model('repies',RecipesSchema)
 module.exports=RecipeModel