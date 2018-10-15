var express = require('express');
var router = express.Router();
//var SinhVien = require('../models/sinhvien');
var DeviceInfo = require('../models/DeviceInfo');

router.get("/get-all-devices",function(req,res,next){
    DeviceInfo.getAllDeviceInfos(function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

//http://localhost:3000/get-device-by-id/1
router.get("/get-device-by-id/:id?",function(req,res,next){
    var id = req.params.id;
    DeviceInfo.getDeviceInfoById(id, function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

router.post('/updateDevice',function(req,res,next){
    var obj = req.body;
    if(obj.id){
        DeviceInfo.update(obj,function(err,count){
            if(err){
                res.json(err);
            } else{
                res.json(req.body);
            }
        });
    } else{
        DeviceInfo.insert(obj, function(err, res, next){
            if(err){
                res.json(err);
            } else{
                res.json(req.body);
            }
        })
    }
    
});

router.delete('/:id',function(req,res,next){
    SinhVien.deleteSV(req.params.id,function(err,count){
        if(err){
            res.json(err);
        } else{
          res.json(count);
        }
    });
});

router.put('/:id',function(req,res,next){
    SinhVien.updateSV(req.params.id,req.body,function(err,rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});
module.exports=router;