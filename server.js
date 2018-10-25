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

var server = app.listen(process.env.PORT || 3001, function() {
    console.log('Server listening on port ' + server.address().port);
  });
  module.exports = app;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");

    next();
});

app.use(senserRouter);
app.use(userRouter);
app.use(deviceRouter);
app.use(createDB);