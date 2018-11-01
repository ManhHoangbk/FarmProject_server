var express = require('express');
var router = express.Router();
var SenserInfo = require('../models/SenserData');

router.get("/get-all-senser",function(req,res,next){
    SenserInfo.getAllDeviceInfos(function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

//http://localhost:3000/get-device-by-id/1
router.get("/get-senser-by-id/:id?",function(req,res,next){
    var id = req.params.id;
    SenserInfo.getDeviceInfoById(id, function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

router.get("/get-senser-by-createdate/:createdate?", function(req, res, next){
    var createdate = req.params.createdate;
    console.log('createdate ', createdate)
    SenserInfo.getSenserDataByCreateDate(createdate, function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

router.post('/updateSenser',function(req,res,next){
    var obj = req.body;
    if(obj.id){
        SenserInfo.update(obj,function(err,count){
            if(err){
                res.json(err);
            } else{
                res.json(req.body);
            }
        });
    } else{
        SenserInfo.insert(obj, function(err, res, next){
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