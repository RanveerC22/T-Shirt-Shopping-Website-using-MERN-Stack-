const mongoose=require("mongoose");
const crypto=require("crypto");
const uuidv1=require("uuid/v1");
const Schema=mongoose.Schema;

const userInfo=new Schema({

    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true,
    },


    lastname:{
        type: String,
        maxlength:32,
        trim:true,
    },

    email:{
        maxlength:50,
        type: String,
        required:true,
        trim:true,
        unique:true,
    },

    user_in:{
        type:String,
        trim:true,
    },

    encry_password:{
        type:String,
      // required:true,
    },

    role:{
        type: Number,
        default:0,
    },

    salt:String,
    
    purchases:{
        type:Array,
        default:[],
    }

},{timestamps:true});

userInfo.virtual("password")
    .set(function(password){
        this._password=password;
        this.salt=uuidv1();
        this.encry_password=this.securepassword(password);
        
    })

    .get(function(){
        return this._password;
    });


userInfo.methods={

    authenticate: function(plainpassword){
        return this.securepassword(plainpassword)===this.encry_password
    },


    securepassword:function(plainpassword){ 
        if(!plainpassword) return "";
        try {   
             return crypto
             .createHmac("sha256",this.salt)
             .update(plainpassword)
             .digest("hex");
        }   catch (error) {
            return "";
        }

    }

};   

module.exports=mongoose.model("User",userInfo);

