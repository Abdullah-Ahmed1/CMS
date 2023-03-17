const jwt = require("jsonwebtoken");
  const authenticateToken  =  (req,res,next)=>{
        console.log("reached-------------middleware")    
    try{
            const token =  req.cookies.token
            const decoded = jwt.verify(token,'12345')
            res.locals.decodedId = decoded.id 
            next()
        }catch(err){
            res.locals.authenticated = false
            return  res.status(400).send({
                maessage : "bad request"
            })
        }
    
}
module.exports = {authenticateToken}