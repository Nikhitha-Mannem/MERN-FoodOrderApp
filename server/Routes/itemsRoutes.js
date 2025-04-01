const express=require('express');
const router=express.Router();
const {getFoodItemsController,addToCartController,getCartController,checkoutController,addOrderController,getOrdersController}=require('../Controllers/itemsController');

router.get('/',getFoodItemsController);

router.post('/addtocart',addToCartController);

router.post('/getcart',getCartController);

router.post('/checkout',checkoutController);

router.get('/postCheckout/success',(req,res,next)=>{
    
    res.json({message:"Payment Successful"})
})

router.get('/postCheckout/cancel',(req,res,next)=>{
    
    res.json({error:"Payment Failed"})
})


router.post('/addOrder',addOrderController);

router.post('/orders',getOrdersController);
module.exports=router;
