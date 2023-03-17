const Mongoose = require("mongoose");
const DailyReport = Mongoose.model("DailyReport");


module.exports = {

    addReport  : async(req,res)=>{
        // console.log("!!!!!!",req.body)
        console.log("add report--*--",req.body.row)
        const date = new Date(`${(new Date().getMonth())+1}/${req.body.row}/${new Date().getFullYear()}`)
        try{  
            const userId = res.locals.decodedId
           const record = await DailyReport.findOne({date: date })
        //    console.log("!!!!!!!!!",record)
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
        console.log("get leaves route reached")
         try{
            const userId = res.locals.decodedId
            const reports = await DailyReport.find({
                user : userId
            })
            
           return res.status(200).send({
                message : "success",
                reports : reports 
            })

        }catch(err){
            console.log(err)
        }
       

        
    }

}