const sendEmail = require('../utils/SendEmail')
const emailQueueProcess = async(job,done)=>{
    await  sendEmail.festiveEmail(job.data.email,'Eid Wishes')
    done()
}

module.exports = emailQueueProcess