const Mongoose = require("mongoose");
const DailyReport = Mongoose.model("DailyReport");


module.exports = {

    addReport  : async(req,res)=>{
        const userId = req.params.userId
        await  DailyReport.create({
            status : req.body.status,
            resaonOfLeave : req.body.reason,
            DaysOfLeave : req.body.days,
            date : new Date(),
            user:  userId
        })
        console.log(req.params.userId)
        console.log(req.body)
        console.log("reached")
    }

}