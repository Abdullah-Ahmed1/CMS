const mongoose = require("mongoose");
try{
    mongoose.connect(
        "mongodb+srv://abdullahahmed10001:zxcZXC@cluster0.b50mkwe.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true },
        
      );
      console.log("db connected successfully")
}catch(err){
    console.log(err)
}




module.exports = mongoose.connect;
require("../models/users.model");
require("../models/projects.model");