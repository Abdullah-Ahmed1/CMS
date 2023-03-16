const mongoose = require("mongoose");
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
    firstname: {
        type:String
    },
    lastname:{
        type:String
    },
    email: {
        type:String
    },
    position:{
        type:String
    },
    password : {
        type:String
    },
    image :{
        type:String
    },
    dob:{
       type:String 
    },
    isManager  : {
        type:Boolean
    },
    manager:{
        type:String
    },

    dateOfJoining:{
        type: String
    },
    presents:{
        type:Number
    },
    leaves:{
       type:Number 
    },
    currentProjects : {
        type:[
            {
            type:mongoose.Schema.Types.ObjectId,   
            ref:"Project"
        }  
    ] 
    }

})


mongoose.model('User', userSchema);



const validate = (data) => {
    const schema = Joi.object({
      firstname: Joi.string().required().label("firstname"),
      lastname: Joi.string().required().label("lastname"),
      email: Joi.string().email().required().label("email"),
      password: passwordComplexity().required().label("password"),
    });
    return schema.validate(data);
  };



 module.exports =  {validate} 