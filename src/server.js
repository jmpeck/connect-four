const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const router = require('./routes');

const express = require('express');
const path = require('path');
const config = require('./config');

mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(function(req, res, next) {
    console.log("req.body BEFORE parsing", req.body);
    next();
  })
  
  app.use(bodyParser.json());
  
  app.use(function(req, res, next) {
    console.log("req.body AFTER parsing", req.body);
    next();
  })

app.use('/api', router);

app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});