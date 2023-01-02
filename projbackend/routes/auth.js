const express=require("express");
const router=express.Router();
const { check, validationResult } = require('express-validator');
const {signout,signup,signin,isSignedIn}=require("../controllers/auth")

router.get("/signout",signout)

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:3}),
],signin)

router.post("/signup",[
    check("name").isLength({min:3}).withMessage("name should be minimun of 3 letters"),
    check("password","password should be minimun of 3 letters").isLength({min:3}),
    check("email","email is required").isEmail(),
],signup)

router.get("/testroute",isSignedIn,(req,res)=>{
    res.send(req.auth);
})



module.exports=router;