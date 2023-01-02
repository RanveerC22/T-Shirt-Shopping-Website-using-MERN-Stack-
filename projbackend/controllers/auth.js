
const User = require("../models/user");
const { check, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken")
const expressJwt=require("express-jwt")


//Signup Route
exports.signup = (req, res) => {
  const user= new User(req.body)
  const errors= validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({
      erros:errors.array()[0].msg
    })
  }

  user.save((err,user)=>{
    if(err){
      console.log(err)
      return res.status(400).json({
        error:"MESSAGE BRO!!"
      })
     
    }
    res.json(
    
      user
    )

   
  })
};


//Signin Route
exports.signin=(req,res)=>{
  const errors= validationResult(req);

  const {email,password}=req.body

 
  if(!errors.isEmpty()){
    return res.status(422).json({
      erros:errors.array()[0].msg
    })
  }

  User.findOne({email},(error,user)=>{

    if(error || !user){
      return res.status(400).json({
        error:"USER email do not exist"
      })
    }

    if(!user.authenticate(password)){
       return res.status(401).json({
       error:"Email and Password do not match"
     })

    } 


    const token=jwt.sign({_id: user._id},process.env.SECRET)
    res.cookie("token",token,{expire: new Date()+9999})
    
    const {_id,name,email,role}=user;
    return res.json({
      token,
      user:{_id,name,email,role }

    })


  })
}

//Signout Route 
exports.signout=(req,res)=>{
  res.clearCookie("token")
  res.json({
    message:"HEYY YOU HAVE SIGNOUT"
  })
}

//Protected
exports.isSignedIn=expressJwt({
  secret: process.env.SECRET,
  userProperty:"auth",
})

exports.isAuthenticate=(req,res,next)=>{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id

  if(!checker){
    return res.status(400).json({
      message:"ACCESS DENIED"
    })  
}
  next();
}

exports.isAdmin=(req,res,next)=>{
  if(req.profile.role===0){
    return res.status(403).json({
      Message:"YOU ARE NOT AN ADMIN"
    })
  }

  next();
}