
const User=require("../models/user");
const Order=require("../models/order")


exports.getUserbyId=(req,res,next,id)=>{
    User.findById(id).exec((error,user)=>{
        if(error || !user){
            return res.status(400).json({
                message:"user not found"
            })
        }

       req.profile=user;
       next();
    })
    
}

exports.getUSer=(req,res)=>{
   req.profile.salt=undefined;
   req.profile.encry_password=undefined;
   return res.send(req.profile)
}

exports.UpdateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},

        (error,user)=>{
            if(error){
                return res.status(403).json({
                    Message:"Not Authorised So Cannot Update"
                })
            }

            user.salt=undefined;
            user.encry_password=undefined;
            return res.send(user);
        }

    )
}

exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((error,order)=>{
        if(error){
            return res.status(400).json({
                Message:"No Order In This Account"
            })
        }

        return res.json(order)
    })
}

exports.pushOrderInPurchaseList=(req,res,next)=>{
    let purchases =[];
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.amount,
            transaction_id:req.body.transaction_id

        })
    })

    User.findOneAndUpdate(

        {_id:req.profile._id},
        {$push :{purchases:purchases}},
        {new:true},
        (error,purchases)=>{
            if(error){
                return res.status(400).json({
                    message:"Unable to save the purchase list"
                })
    
            }

            next();
        }
    
    )
}

