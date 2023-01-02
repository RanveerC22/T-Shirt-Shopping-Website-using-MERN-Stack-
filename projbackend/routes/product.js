const express=require("express");
const router = express.Router();
const {getUserbyId}=require("../controllers/user")
const {isSignedIn,isAuthenticate,isAdmin} =require("../controllers/auth")
const {getproductbyid,createProduct,getProduct,photo,deleteProduct,updateProduct,getallproducts,getdistinctcatrgories}=require("../controllers/product")

router.param("myid",getUserbyId);
router.param("productid",getproductbyid);

router.post("/product/create/:myid",isSignedIn,isAuthenticate,isAdmin,createProduct)

router.get("/product/:productid",getProduct)

router.get("/product/photo/:productid",photo)

router.delete("/product/:productid/:myid",isSignedIn,isAuthenticate,isAdmin,deleteProduct)

//router.put("/product/delete/:productid,:myid",isSignedIn,isAuthenticate,isAdmin,updateProduct)

router.put("/product/:productid/:myid",isSignedIn,isAuthenticate,isAdmin,updateProduct)

router.get("/products",getallproducts)

router.get("/products/categories",getdistinctcatrgories)
module.exports=router;