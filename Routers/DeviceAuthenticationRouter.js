var express = require('express');
var router = express.Router();
//var SinhVien = require('../models/sinhvien');
var DeviceAuthentication = require('../models/DeviceAuthentication');


//http://localhost:3000/get-device-by-id/1
router.get("/gen_device_authentication/:password/:id",function(req,res,next){
    var id = req.params.id;
    var password = req.params.password;
    var obj = {
        deviceId : id,
        password : password,
        key_device : new Date().getTime()+"_"+ Math.floor((Math.random() * 10000)),
        create_date : new Date().getTime(),
    }
    DeviceAuthentication.insert(obj, function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});
module.exports=router;