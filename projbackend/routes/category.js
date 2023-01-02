const express=require("express");
const router=express.Router();

const {getCategorybyId,createCategory,getCategory,getallcategories,updateCategory,deleteCategory}=require("../controllers/category")
const {isAuthenticate,isSignedIn,isAdmin}=require("../controllers/auth")
const {getUserbyId}=require("../controllers/user")

//params
router.param("myid",getUserbyId);
router.param("categoryId",getCategorybyId)

//actual routes 
router.post("/category/create/:myid",isSignedIn,isAuthenticate,isAdmin,createCategory)
router.get("/category/:categoryId",getCategory)
router.get("/categories",getallcategories)

router.put("/category/:categoryId/:myid",isSignedIn,isAuthenticate,isAdmin,updateCategory)

router.delete("/category/:categoryId/:myid",isSignedIn,isAuthenticate,isAdmin,deleteCategory)


module.exports=router;