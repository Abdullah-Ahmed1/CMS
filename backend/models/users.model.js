const mongoose = require("mongoose");
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