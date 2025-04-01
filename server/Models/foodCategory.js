const mongoose=require('mongoose');

const foodCategorySchema=new mongoose.Schema({
    "CategoryName": { type: String, required: true },
    
  },
  { collection: 'foodcategories' }
  )

const foodcategories = mongoose.model('foodcategories',foodCategorySchema);
module.exports=foodcategories;