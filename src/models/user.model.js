import mongoose,{Schema} from "mongoose";
import jwt from"jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true, //This property ensures that the leading and trailing whitespaces are removed.
        index:true, //This property helps in searching in the database 
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true, //This property ensures that the leading and trailing whitespaces are removed. 
        lowercase:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary link
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String
    }




},{timestamps:true});
//Here below we are using pre (middleware) what it does it performs hashing of password if it is saved
//It does takes the arrow function as the callback Function as it does not has context to this keyword instead it uses anonymous function. 
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return next(); //If password is not modified then skip hashing
    this.password=bcrypt.hash(this.password,10) //Here the 10 is the no of rounds the hashing will be performed.
    next()
})
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    //To generate the token we need to give the payload here jwt.sign() gives the payload
   return  jwt.sign(
        {
            _id:this.id,
            username:this.username,
            fullName:this.fullName,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    //To generate the token we need to give the payload here jwt.sign() gives the payload
   return  jwt.sign(
        {
            _id:this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User=mongoose.model("User",userSchema);