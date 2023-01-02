const express=require("express");
const router=express.Router();
const {isAuthenticate,isSignedIn,isAdmin}=require("../controllers/auth")
const {getUserbyId,pushOrderInPurchaseList}=require("../controllers/user")
const {getstoso}=require("../controllers/product")
const {getorderbyid,getorderstatus,updatestatus,createorder,getallorder}= require("../controllers/order")

router.param("orderid",getorderbyid)
router.param("myid",getUserbyId)

router.post("/order/create/:myid",isSignedIn,isAuthenticate,pushOrderInPurchaseList,getstoso,createorder)

router.get("/order/getallorder/:myid",isSignedIn,isAuthenticate,isAdmin,getallorder)

router.get("/order/status/:myid",isSignedIn,isAuthenticate,isAdmin,getorderstatus)
router.put("/order/:orderid/status/:myid",isSignedIn,isAuthenticate,isAdmin,updatestatus)
module.exports=router