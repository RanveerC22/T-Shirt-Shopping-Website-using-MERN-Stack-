
const Product=require("../models/product")
const formidable=require("formidable")
const _ =require("lodash")
const fs=require("fs")

exports.getproductbyid=(req,res,next,id)=>{
    Product.findById(id).populate("category").exec((error,product)=>{
        if(error){
            return res.status(400).json({
                message:"Product didnt exist"
            })
        }

        req.product=product;
        next();
    })
}

exports.createProduct=(req,res)=>{
    const form= new formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(errors,fields,file)=>{
        if(errors){
            return res.status(400).json({
                message:"Problem in Image"
            })
        }

        const{name,description,price,category,stock}=fields;

      
        if(!name|| !description|| !price|| !category|| !stock){
            return res.status(400).json({
                message:"Please enter all the necessary fields"
            })

        }

        

        let product=new Product(fields) //Fields will be passed by the user from frontend

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    message:"File Size too big"
                })
            }
        }

        //Including file in product
        product.photo.data=fs.readFileSync(file.photo.path)
        product.photo.contentType =file.photo.type


        product.save((error,product)=>{
            if(error){
                return res.status(400).json({
                    message:"Saving Tshirt in DB Failed"
                })
            }

            res.json(product)
        })
    })
}

exports.getProduct=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product)
}

exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }

    next();
}

exports.deleteProduct=(req,res)=>{
    let product=req.product
    product.remove((err,deletedProduct)=>{
        if(err){
           return res.status(400).json({
                message:"Failed to delete Product"
            })
        }

        res.json({
            message:`The product ${deletedProduct.name} deleted successfully`,
            deletedProduct
        })

        
    })
}

exports.updateProduct=(req,res)=>{

    const form= new formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(errors,fields,file)=>{
        if(errors){
            return res.status(400).json({
                message:"Problem in Image"
            })
        }

        let product=req.product
        product=_.extend(product,fields)

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    message:"File Size too big"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //Including file in product
       
        
        product.save((error,product)=>{
            if(error){
                return res.status(400).json({
                    message:"Updation of product Failed"
                })
            }

            res.json(product)
        })
    })
    
}

exports.getallproducts=(req,res)=>{

    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortby = req.query.sortby ? req.query.sortby : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortby,"asc"]])
    .limit(limit)
    .exec((error,products)=>{
        if(error){
            return res.status(400).json({
                message:"Couldnt get all the products"
            })
        }

        res.json(products)
    })
}

exports.getdistinctcatrgories=(req,res)=>{
   Product.distinct("category",{},(errors,categories)=>{
    if(errors){
        return res.status(400).json({
            message:"No Category Found"
        })
    }

    res.json(categories)
   })
}

exports.getstoso=(req,res,next)=>{

    let myoperations=req.body.order.products.map(prod=>{

        return {
            updateOne:{
                filter: {_id:prod._id},
                update : {$inc: {stock: -prod.count, sold: +prod.count}}
    
            }
        }

        
    })

    Product.bulkWrite(myoperations,{},(error,products)=>{
        if(error){
            return res.status(400).json({
                message:"Bulk Operation Failed"
            })
        }
        next();
    })
    
}