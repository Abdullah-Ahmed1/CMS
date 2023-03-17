const  express = require("express")
const app = express()
const cors = require('cors')
require("./Connection/connection");
const cookieparser  = require("cookie-parser")
// require("../models/user.model");

// app.use(
//     cors({
//       origin: "*",
//     })
//   );


 app.use( cors({ credentials: true, origin: "http://localhost:5173" })
)
  // app.use(function(req, res, next) {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  //   res.header('Access-Control-Allow-Credentials', true);
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   next();
  // });
app.use(express.json())
app.use(cookieparser())
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