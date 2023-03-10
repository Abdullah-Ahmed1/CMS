const Mongoose = require("mongoose");
const DailyReport = Mongoose.model("DailyReport");


module.exports = {

    addReport  : async(req,res)=>{
        console.log("!!!!!!>",req.body)
        try{  
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
    }catch(err){
        console.log(err)
    }
    },
    getReport  : async(req,res)=>{
         try{
            const userId = req.params.userId
            console.log("!!!!!!",req.params.userId)
            console.log("reached get report controller")
    
              const reports = await DailyReport.find({
                user : userId
            })

            res.status(200).send({
                message : "success",
                reports : reports 
            })

        }catch(err){
            console.log(err)
        }
       

        
    }

}