//---------------------------

const { ExpressAdapter } = require('@bull-board/express');
const serverAdapter = new ExpressAdapter();
const Queue = require('bull');
const emailQueue = new Queue('emailQueue'
// , {redis: { port: 6379, host: '127.0.0.1', password: 'foobared' },}
  )

// router.get('/admin/queues', serverAdapter.getRouter());
const { createBullBoard } = require('@bull-board/api');

const board= createBullBoard({
    queues: [],
    serverAdapter: serverAdapter,
  });
 
//---------------------------
module.exports = {emailQueue,serverAdapter,board}