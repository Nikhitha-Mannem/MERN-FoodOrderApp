const mongoose=require('mongoose');
const itemsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true

    },
    price:{
        type:Number,
        required:true

    }
})
const orderSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
        
    },
    orderItems:{
        type:[itemsSchema]

    },
    totalPrice:{
        type:String,
        required:true
    },
    orderedAt:{
        type:Date,
        default:new Date()
    }

})

const orders=mongoose.model('orders',orderSchema);
module.exports=orders;