const Mongoose = require("mongoose");
const DailyReport = Mongoose.model("DailyReport");


module.exports = {

    addReport  : async(req,res)=>{
        // console.log("!!!!!!",req.body)
        console.log("add report--*--",req.body.row)
        const date = new Date(`${(new Date().getMonth())+1}/${req.body.row}/${new Date().getFullYear()}`)
        try{  
           const record = await DailyReport.findOne({date: date })
           console.log("!!!!!!!!!",record)
           if(record){
            await DailyReport.findByIdAndUpdate({_id : record._id},{ 
                status : req.body.status,
                reasonOfLeave : req.body.reason,
                DaysOfLeave : req.body.days,
                // date : date,
                // user:  userId
            })

            res.send({
                status:"success",
                message:"updated successfully"
            })

           } else{
            const userId = req.params.userId
            await  DailyReport.create({
                status : req.body.status,
                reasonOfLeave : req.body.reason,
                DaysOfLeave : req.body.days,
                date : date,
                user:  userId
            })
            
            res.send({
                status:"success",
                message:"added successfully"
            })
           }  
         
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