var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var deviceRouter = require('./Routers/DeviceRoutes');
var userRouter = require('./Routers/UserRouter');
var senserRouter = require('./Routers/SenserRouter')
var createDB = require('./Routers/CreateDB');
//var mqtt = require('./mqtt');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var server = app.listen(3001, function() {
    console.log('Server listening on port ' + server.address().port);
  });
  module.exports = app;

app.use(senserRouter);
app.use(userRouter);
app.use(deviceRouter);
app.use(createDB);