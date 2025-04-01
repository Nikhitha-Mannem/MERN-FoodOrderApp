const express=require('express');
const router=express.Router();
const {registerController,loginController,mailResetLink,resetPassword}=require('../Controllers/authControllers');



router.post('/register',registerController);

router.post('/login',loginController);
router.post('/reset-password',mailResetLink);
router.post('/reset-password/:token',resetPassword);


module.exports=router;