const sendEmail = require('../utils/SendEmail')
const emailQueueProcess = async(job,done)=>{
    console.log("reached")
    await  sendEmail.festiveEmail(job.data.email,'Eid Wishes')
    done()
}

module.exports = emailQueueProcess