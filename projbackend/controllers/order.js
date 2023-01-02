const {Order,ProductCart} = require("../models/order")

exports.getorderbyid=(req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name _id")
    .exec((error,order)=>{
        if(error){
            return res.status(400).json({
                meessage:"Couldnt find order in DB"
            })
        }

        req.order=order;
        next();
    })
}

exports.createorder=(req,res)=>{
    req.body.order.user=req.profile;
    const order= new Order(req.body.order)
    order.save((errors,ordero)=>{
        if(errors){
            return res.status(400).json({
                message:"Cannot save order in DB"
            })
        }

        res.json(ordero)
    })
}

exports.getallorder=(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((error,allorder)=>{
        if(error){
            return res.status(400).json({
                message:"Cannot get all orders"
            })
        }

        res.json(allorder)
    })
}

exports.getorderstatus=(req,res)=>{
    return res.sjon(Order.schema.path("status").enumValues)
}

exports.updatestatus=(req,res)=>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (erroro,order=>{
            if(erroro){
                return res.status(400).json({
                    message:"Cannot Update Status of order"
                })
            }

            res.json(order)
        })
    )
}