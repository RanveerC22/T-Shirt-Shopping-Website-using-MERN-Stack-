const express =require("express");
const router=express.Router();
const {getUserbyId,getUSer,UpdateUser,userPurchaseList}=require("../controllers/user")
const {isSignedIn,isAuthenticate}=require("../controllers/auth")

router.param("myid",getUserbyId);

router.get("/user/:myid",isSignedIn,isAuthenticate,getUSer)

router.put("/user/:myid",isSignedIn,isAuthenticate,UpdateUser)

router.get("/orders/user/:myid",isSignedIn,isAuthenticate,userPurchaseList)


module.exports=router; 