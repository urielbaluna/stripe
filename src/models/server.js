const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
    this.server = require('http').createServer(this.app);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/subscription', require('../routes/subscription.routes.js'));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Server running on port', this.port);
  });
  }
}

module.exports = Server;