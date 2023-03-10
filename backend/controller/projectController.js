const Mongoose = require("mongoose");
const Project = Mongoose.model("Project");
const User = Mongoose.model("User");


module.exports = {
    createProject: async(req,res)=>{
    try{
        await Project.create(req.body)

        res.status(200).send({
          message: "project created successfully"  
        })
    }catch(err){
        console.log(err)
    }    
}
,

addMemberToPorject : async(req,res)=>{
    const {project_id,user_id} = req.body;
    // const userId = req.params.userId 
    try{
        console.log("add member to project reached")

        const project  =  await Project.findOne({_id:project_id})

        if(project){
            if(project.members.includes(user_id)){
                res.status(400).send({
                    message : "user already exists"
                })
            }else{
                await Project.updateOne(
                    {_id: project_id},
                    { $push: { 'members': user_id } },
                    {upsert: true}
                    )
                await User.updateOne(
                    {_id :user_id} ,
                    { $push: { 'currentProjects': project_id } },
                    {upsert: true}
                    )

                    res.status(200).send({
                        message:"member added successfully"
                    })

            }
        }else{
            res.status(400).send({
                message: "Project doesnot exist"
            })
        }
    }catch(err){
        console.log("---------->",err)
    }
}
,

    getProjects: async(req,res)=>{
        try{
            const projects =  await Project.find({})
            .populate({
                path :'members',
                select:{
                    _id : 1,
                    firstname:1,
                    lastname:1,
                    email : 1,
                }  
            })
            .exec()
            res.send({projects})
        }catch(err){
            console.log(err)
            res.status(400).send({
                status:"fail",
                message : "something went wrong" 
            })
        }
      
    }
,

    getProjectsByUser : async (req,res)=>{
       try{ const userId = req.params.userId
        const projects = await Project
        .find({})
        // .populate({
        //     path : "members"
        // })

        // here we want to filter projects that includes specific username
        let projectIds = []
        const list =   projects.map((item)=>{
            // console.log("projects: " ,item)
            if(item.members.includes(userId)){
                projectIds.push(item._id)
            }
         
        })

        // console.log("projectsIds",projectIds)


        const temp = await Project.find({"_id":{
            "$in" : projectIds
       }})

        console.log('-**-->',temp)


        res.status(200).send({
            projects : temp
        })

    }catch(err){
        console.log(err)
    }


   
    }

}