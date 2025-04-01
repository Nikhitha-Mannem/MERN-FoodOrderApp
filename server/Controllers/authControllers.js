const users=require('../Models/users');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const registerController=async(req,res,next)=>{
    //console.log(req.body.email);
    const {username,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    try{
        const newUser=new users({
            username:username,
            email:email,
            password:hashedPassword
        })
        const savedDoc=await newUser.save();
        res.status(200).json({
            success:true,
            message:'Registerd Successfully',
            data:savedDoc

        })

    } 
    catch(error){
        res.status(error.name === "ValidationError" ? 400 : 500).json({
            success:false,
            message:'Failed to Register User',
            data:error.message
        })

    }
    
    
}

const loginController=async(req,res,next)=>{
    const {email,password}=req.body;
    //console.log(req.body.email);
    const user=await users.findOne({email:email})
    if(!user){
        res.status(404).json({
            success:false,
            message:'User Not Found.Please Register first.',
            
        })

    }
    else{
        const isValidUser=await bcrypt.compare(password,user.password);
        if(!isValidUser){
            res.status(401).json({
                success:false,
                message:'Incorrect password. Please try again.',
                
            })
        }
        else{
            const secret=process.env.JWT_SECRET;
            const authToken=JWT.sign({username:user.username,userId:user._id},secret);
            res.status(200).json({
                success:true,
                message:'Login Successful',
                data:user,
                token:authToken
            })
        }
    }

    

}

const mailResetLink=async (req,res,next)=>{
    const {email}= req.body;
   
    const user=await users.findOne({email:email})
    
    if(!user){
        res.json({Error:"User Not Found"})
    }
    else{
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'nikhithamannem123@gmail.com',
                pass:'feew xiaq llxv gmks'
            }
        })
        const token=JWT.sign({email:email},process.env.JWT_SECRET,{expiresIn:'1h'});
        try{

            await transporter.sendMail({
                from:'nikhithamannem123@gmail.com',
                to:email,
                subject:'Password Reset Link',
                html:`
                <p>Click on the link to reset your password</p>
                <a href="http://localhost:3000/reset-password/${token}">Change password</button>
                `
            })
            res.json({message:"Password Reset Link sent to Mail"})

        }
        catch(err){
            res.json({Error:"Error in sending Reset Password Mail"})
        }
        
    }

}

const resetPassword = async (req, res, next) => {
    const token = req.params.token;
    const { email, newPassword } = req.body;

    try {
        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.json({ Error: "Invalid or expired token" });
        }

        // Find the user by email
        const user = await users.findOne({ email: email });
        if (!user) {
            return res.json({ Error: "User not found" });
        }

        // Hash the new password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ message: "Password Reset Successful" });

    } catch (err) {
        console.log("Error during password reset:", err.message);
        res.json({ Error: "Failed to Reset Password" });
    }
};

module.exports={registerController,loginController,mailResetLink,resetPassword};