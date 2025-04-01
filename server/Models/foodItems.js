const mongoose=require('mongoose');

const foodItemsSchema = new mongoose.Schema({
    CategoryName: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    options: [
      {
        half: { type: String },
        full: { type: String }
      }
    ],
    description: { type: String, required: true }
  }, { collection: 'fooditems' });
const fooditems = mongoose.model('fooditems',foodItemsSchema);
module.exports=fooditems;