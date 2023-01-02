require('dotenv').config()

//Decleration
const mongoose=require("mongoose");
const express=require("express");
const app= express();
const port=process.env.PORT

const bodyParse=require("body-parser");
const cookieParse=require("cookie-parser");
const cors=require("cors");

//Include Routes
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user")
const categoryRoutes=require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripepayment")



//Connection With Data Base
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

.then(()=>{
    console.log("DB CONNECTED");
})


//Middlewere
app.use(bodyParse.json())
app.use(cookieParse())
app.use(cors())

//My Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);




//Starting Server
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
});