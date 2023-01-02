const Category =require("../models/category")


exports.getCategorybyId=(req,res,next,id)=>{

    Category.findById(id).exec((error,cate)=>{
        if(error){
            res.status(400).json({
                message:"Category Not Found in DB"
            })
        }

        req.category=cate;
        next();
    })

   

    
}

//creating a new category and storing it in DataBase
exports.createCategory=(req,res)=>{
    const category=new Category(req.body)
    category.save((error,category)=>{
        if(error){
            res.status(400).json({
                message:"Not able to save category in DB"
            })
        }

        res.json(category)
    })
}

//Simply getting the category
exports.getCategory=(req,res)=>{
    return res.json(req.category)
}

//Getting all the categories
exports.getallcategories=(req,res)=>{
    Category.find().exec((error,allcategory)=>{
        if(error|| !allcategory){
            return res.status(400).json({
                message:"Cannot get all the categories"
            })
        }

        return res.json(allcategory)
    })
}


//Updating the category
exports.updateCategory=(req,res)=>{
    const category=req.category;
    category.name=req.body.name;
   

    category.save((error,updatedcategory)=>{
        if(error){
            res.status(400).json({
                message:"Failed to update Category"
            })
        }

       return res.json(updatedcategory)

        
    })
}

exports.deleteCategory=(req,res)=>{
    const category=req.category;
    category.remove((error,deletedcategory)=>{
        if(error){
            res.status(400).json({
                message:"Failed to delete Category"
            })
        }

        res.json({
            message:`The category ${deletedcategory.name} deleted successfully`
        })



    })

}