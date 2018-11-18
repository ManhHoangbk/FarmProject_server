var express = require('express');
var router = express.Router();
var db = require('../Dbconnection');
var DeviceInfo = require('../models/DeviceInfo');
var FarmInfo = require('../models/FarmInfo');
var SenserData = require('../models/SenserData');
var UserInfo = require('../models/UserInfo');
var DeviceAuthentication = require('../models/DeviceAuthentication');

router.get("/createDB",function(req,res,next){
    var dbName = "FarmProject";

    var sql = "CREATE DATABASE IF NOT EXISTS " + dbName
    + " DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_unicode_ci ";
    db.query(sql, function (err, result) {
        if (err){
            console.log("Database error");
            console.log('error: ', err)
        } else{
            console.log("Database created");
            DeviceInfo.createDB(function(err, rows){
                if(err){
                    console.log('error: ', err)
                } 
            });
            FarmInfo.createDB(function(err, rows){
                if(err){
                    console.log('error: ', err)
                } 
            });
            SenserData.createDB(function(err, rows){
                if(err){
                    console.log('error: ', err)
                } 
            });
            UserInfo.createDB(function(err, rows){
                if(err){
                    console.log('error: ', err)
                } 
            });
            DeviceAuthentication.createDB(function(err, rows){
                if(err){
                    console.log('DeviceAuthentication error: ', err)
                } 
            });
            res.json("done");
        }
        
      });

    
});

router.get("/fakedata", function(req, res, next){
    var userObj = {
        account : "admin",
        email : "admin@gmail.com",
        roleType : 0,
        password : "admin",
    }
    UserInfo.insert(userObj, function(err, result){
        if (err) throw err;
        console.log("1 record inserted userObj");
    });

    var deviceobj = {
        id : 1,
        name : "Board01"
    }
    DeviceInfo.insert(deviceobj, function(err, result){
        if (err) throw err;
        console.log("1 record inserted deviceobj");
    });

    var farmObj = {
        id : 1,
        name : "Nông trại 0001"
    }

    FarmInfo.insert(farmObj, function(err, result){
        if (err) throw err;
        console.log("1 record inserted farmObj");
    })

    var senserObj = {
        senser_id : 1,
        sensor_name : "Cảm biến nhiệt độ", 
        senser_value : 33.7,
        device_id : 1,
        farm_id : 1,
        createDate : new Date().getTime(),
    }
    SenserData.insert(senserObj, function(err, result){
        if (err) throw err;
        console.log("1 record inserted senserObj");
    })
    res.json("done");
});

module.exports=router;

