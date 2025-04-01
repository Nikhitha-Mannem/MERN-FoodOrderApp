const express=require('express');
const { default: mongoose } = require('mongoose');
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
const cartSchema=new mongoose.Schema({
    cartItems:[itemsSchema],
    totalPrice:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
        unique:true

}})
const carts=mongoose.model('carts',cartSchema);
module.exports=carts;