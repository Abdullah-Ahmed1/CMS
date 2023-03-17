const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");
require("../models/users.model");
const User = Mongoose.model("User");
const {validate} = require("../models/users.model")
const bcrypt = require("bcrypt");

module.exports={
    test:(req,res)=>{
        User.create({
            firstname:"abdullah",
            email:"abdullah.ahmed1001@gmail.com"
        })
        .then((user=>{
            console.log(user)
        }))
        .catch((err)=>{
            console.log(err)
        })
    },

    register  :async(req,res)=>{
        try{
            console.log("register reached")
            console.log("hashed password is : " , req.body.password)
            const  { error } = validate(req.body);
            if(error){
                console.log("error in validation : ",error)
             return res.status(400).send({
                status : "fail",
                message: "something went wrong with validation"
               })
            }

        const user =  await User.findOne({
            email: req.body.email
        })
    
        if(user){
            return   res.status(400).send({
                status:'bad request',
                message:'email already exists'    
            })
        }else{
            const created =  await User.create(req.body)
            return res.status(200).send({
                status:'success',
                message:'user created successfuly'   
            })
        }   
        }catch(err){
            console.log(err)
        }
       
    }
,
    login:async(req,res)=>{
       try{
        console.log(" login reachedddddddd")
        const user = await User.findOne({
            email:req.body.email
        })
       const validPass  =  await bcrypt.compare(
            req.body.password,
            user.password
          );
        if(!user)
           return res.status(400).send({
                status:"failure",
                message:"Invalid username or password"
            })
        else if(!validPass){
           return res.status(400).send({
                status:"failure",
                message:"Invalid username or password"
            })
        }else{
               
        const token = jwt.sign({email:user.email, id : user._id,password:user.password},'12345')
        res.cookie('token', token, { httpOnly: true });
         return res.status(200).json({
            status:"success",
            message: "login sucessfull",
            token : token
        })
        }
        
       }catch(err){
        return res.status(400).send({
            status:"fail",
            message: "something went wrong",
        })
       }
    }
    ,
    getAllUsers:async(req,res)=>{
        try{
            const users =  await User.find({})
          return  res.status(200).send({
                status:"success",
                users : users
            })

        }catch(err){
           return  res.status(400).send({
                status:"fail",
                message:"something went wrong"
            })
        }   
    },

    getUserById : async(req,res)=>{
            
        try{
             const id = res.locals.decodedId

            const user =  await User.findById({_id:id})
            .populate({
                path : 'currentProjects'
            })
            if(user){
               return res.status(200).send({
                    status:"success",
                    user : user  
                })
            }else{
              return  res.status(404).send({
                    status:"not found",
                })
            }
           
        }catch(err){
            console.log(err)
            return res.status(400).send({
                message: "bad request"
            })
        }
        
    },

    deleteUserById : async(req,res)=>{
        const userId = req.params.id 
        try{
            const user =  await User.findByIdAndDelete({
                _id : userId
            })
          if(user){
             return res.status(200).send({
                status:"success",
                message:" User deleted successfully"
             })
          } else{
            return res.status(400).send({
                status:"fail",
                message:"something went wrong"
             })
          } 
        }catch(err){
            console.log(err)
        }
    }
}