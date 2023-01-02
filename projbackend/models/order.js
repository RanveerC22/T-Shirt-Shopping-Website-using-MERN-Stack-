
const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const ProductChartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product",
    },
    count:Number,
    price:Number,
    size:{type:String},
    name:String,

});

const ProductCart =mongoose.model("ProductCart",ProductChartSchema);

const OrderSchema=new mongoose.Schema({
    products:[ProductChartSchema],
    transaction_id:{},
    amount:{type:String},
    updated:Date,
    status:{
        type:String,
        default:"Received",
        enum:["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    address: String,
    user:{
        type: ObjectId,
        ref:"User",
    }
},{timestamps:true})

const Order= mongoose.model("Order",OrderSchema);

module.exports={Order,ProductCart}