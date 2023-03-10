const  express = require("express")
const app = express()
const cors = require('cors')
require("./Connection/connection");
// require("../models/user.model");

app.use(
    cors({
      origin: "*",
    })
  );
app.use(express.json())
app.get('/',(req,res)=>{
    console.log("hello world")
})

const userRouter = require('./routes/userRoute')
app.use('/',userRouter)
const porjectRouter = require('./routes/projectRoute')
app.use('/projects',porjectRouter)
const LeaveMangementRoute = require('./routes/LeaveMangementRoute')
app.use('/leaveManagement',LeaveMangementRoute)
app.listen(3333,()=>{
    console.log("app is running on port 3333")
})