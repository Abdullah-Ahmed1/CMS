const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");
require("../models/users.model");
const User = Mongoose.model("User");

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
        const user =  await User.findOne({
            email: req.body.email
        })
    
        if(user){
            res.status(400).send({
                status:'bad request',
                message:'email already exists'    
            })
        }else{
            const created =  await User.create(req.body)
            res.status(200).send({
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
        const user = await User.findOne({
            email:req.body.email
        })
        if(!user)
            res.status(400).send({
                status:"failure",
                message:"Invalid username or password"
            })
        else if(user.password !== req.body.password){
            res.status(400).send({
                status:"failure",
                message:"Invalid username or password"
            })
        }else{
               
        const token = jwt.sign({email:user.firstname, password:user.password},'12345')
        
        res.status(200).send({
            status:"success",
            message: "login sucessfull",
            token : token
        })
        }
        
       }catch(err){
        res.status(400).send({
            status:"fail",
            message: "something went wrong",
        })
       }
    }

    ,
    getAllUsers:async(req,res)=>{
        try{
            const users =  await User.find({})
            res.status(200).send({
                status:"success",
                users : users
            })

        }catch(err){
            res.status(400).send({
                status:"fail",
                message:"something went wrong"
            })
        }   
    },

    getUserById : async(req,res)=>{
        const userId = req.params.id 
        console.log(userId)
        try{
            const user =  await User.findById({_id:userId})
            if(user){
                res.status(200).send({
                    status:"success",
                    user : user  
                })
            }else{
                res.status(404).send({
                    status:"not found",
                })
            }
           
        }catch(err){
            console.log(err)
        }
        
    },
    deleteUserById : async(req,res)=>{
        const userId = req.params.id 
        try{
            const user =  await User.findByIdAndDelete({
                _id : userId
            })
          if(user){
             res.status(200).send({
                status:"success",
                message:" User deleted successfully"
             })
          } else{
            res.status(400).send({
                status:"fail",
                message:"something went wrong"
             })
          } 
        }catch(err){
            console.log(err)
        }
    }
}