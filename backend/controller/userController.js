const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");
require("../models/users.model");
const User = Mongoose.model("User");
const {validate} = require("../models/users.model")
const bcrypt = require("bcrypt");
const Token = require("../models/token.model");
const crypto = require("crypto");
const sendEmail = require("../utils/SendEmail");

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


            const token = await new Token({
                userId: created._id,
                token: crypto.randomBytes(32).toString("hex"),
              }).save();

              const url = `${process.env.BASE_URL}users/${created.id}/verify/${token.token}`;
              const response =  await sendEmail(created.email, "Verify Email", url);
            return res.status(200).send({
                status:'success',
                message:'An Email sent to your account please verify'   
            })
        }   
        }catch(err){
            console.log(err)
        }
       
    },

    verify : async(req,res)=>{
        const userId = req.params.id
        const temp_token = req.params.token
        console.log("email verify reached---------->",userId,temp_token)
        try {
            const user = await User.findOne({ _id:userId });
            console.log("user1: ", user);
            if (!user) return res.status(400).send({ message: "Invalid link" });
      
            const token = await Token.findOne({
              userId: user._id,
              token: temp_token
            });

            console.log("token->",token)
            if (!token) return res.status(400).send({ message: "Invalid link" });
            console.log("reached");
            // { _id: user._id, verified: true }
            const a = await User.updateOne({ _id: user._id }, { verified: true });
            await token.deleteOne({_id: token._id});
      
            return res.status(200).send({ message: "Email verified successfully" });
          } catch (error) {
            console.log("error", error);
            res.status(500).send({ message: "Internal Server Error", error: error });
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

         if(!validPass){
           return res.status(400).send({
                status:"failure",
                message:"Invalid username or password"
            })
        }
        
        if(!user.verified){
            return res.status(400).send(({
                status:"failure",
                message:"email is not verified"
            }))
        }
            
            
        const token = jwt.sign({email:user.email, id : user._id,password:user.password},'12345')
        res.cookie('token', token, { httpOnly: true });
         return res.status(200).json({
            status:"success",
            message: "login sucessfull",
            token : token
        })
        
        
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