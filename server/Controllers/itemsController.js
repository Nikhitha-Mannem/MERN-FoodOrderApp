const fooditems = require('../Models/foodItems');
const foodcategories = require('../Models/foodCategory');
const carts = require('../Models/cart');
const orders=require('../Models/orders');
const stripe=require('stripe')(process.env.STRIPE_SECRET);

const getFoodItemsController = async (req, res, next) => {
    try {

        const foods = await fooditems.find();
        const categories = await foodcategories.find();
        res.json({ foods: foods, categories: categories });

    }
    catch (error) {
        res.json({ error: error.message })

    }




}

const addToCartController = async (req, res, next) => {
    const { title, quantity, user, price } = req.body;
    
    try {
        let userCart = await carts.findOne({ user: user });
        
        if (!userCart) {
            userCart = new carts({ cartItems: [{ title: title, price: price, quantity: quantity }], totalPrice: price*quantity, user: user })
            
        }
        else{
            userCart.cartItems.push({ title: title, price: price, quantity: quantity });
            userCart.totalPrice+=price*quantity;

        }
        
        
        await userCart.save();

        
        res.json({message:'Item Added to Cart'})

    }
    catch(error){ 
        res.json({ error: error.message })


    }
    

}

const getCartController=async(req,res,next)=>{
    
    const {userid}=req.body
    try{
        const userCart=await carts.findOne({user:userid})
        if(!userCart){
            res.json({cartItems:[],totalPrice:0})
        }
        else{
            res.json({cartItems:userCart.cartItems,totalPrice:userCart.totalPrice})
        }

    }
    catch(error){
        res.json({error:error.message})
    }
    

}

const checkoutController=async(req,res,next)=>{
    const {cartItems}=req.body;
    const line_items=cartItems.map((item,index)=>{
        return ({
            price_data:{
                currency:'inr',
                product_data:{
                    name:item.title
                },
                unit_amount:item.price*100

            },
            quantity:item.quantity
        })
    })
    try{
        const session=await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:line_items,
            mode:'payment',
            success_url:'http://localhost:3000/payment/success',
            cancel_url:'http://localhost:3000/payment/failure'
            
        })
        res.json({sessionId:session.id});

    

    }catch(error){
        console.log("error Occured in creating session",error.message)
    }
    

}

const addOrderController = async (req, res, next) => {
    const { userId } = req.body;
    try {
        // Retrieve the user's cart
        const userCart = await carts.findOne({ user: userId });

        // Check if the cart exists and has items
        if (!userCart || userCart.cartItems.length === 0) {
            return res.json({
                status: false,
                message: "Cart is empty, cannot place an order"
            });
        }

        // Create a new order from the cart items
        const newOrder = new orders({
            user: userId,
            orderItems: userCart.cartItems,
            totalPrice: userCart.totalPrice
        });
        await newOrder.save();

        // Clear the cart properly using $set to keep the cart document
        await carts.findOneAndUpdate(
            { user: userId },
            { $set: { cartItems: [], totalPrice: 0 } }
        );

        res.json({
            status: true,
            message: "Order placed successfully"
        });

    } catch (error) {
        console.log("Error in addOrderController:", error.message);
        res.json({
            status: false,
            message: error.message
        });
    }
};


const getOrdersController=async(req,res,next)=>{
    const {userId}=req.body;
    const orderItems= await orders.find({user:userId});
    if(orderItems){
        res.json({orderItems:orderItems})
    }
    else{
        res.json({message:"You Have Not Placed any Order Yet.."})

    }
    



}

module.exports = { getFoodItemsController, addToCartController ,getCartController,checkoutController,addOrderController,getOrdersController};