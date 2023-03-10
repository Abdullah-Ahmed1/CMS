const mongoose = require("mongoose");
const dailyReportSchema = new mongoose.Schema({
    Date : {
        type:String
    },
    status:{
        type:String
    },
    resaonOfLeave:{
        type:String
    },
    DaysOfLeave :{
        type: String 
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,   
        ref:"User"
    }
})
mongoose.model('DailyReport',dailyReportSchema);