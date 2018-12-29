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

router.post("/saveSensers", function(req, res, next){
    var obj = req.body;
    console.log("obj ", obj)
    if(obj){
        SenserInfo.saveMultiSenser(obj, function(err, rows){
            if(err){
                res.json(err);
            } else{
                res.json(rows);
            }
        });
    } else{
        console.log('error')
    }
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

//http://localhost:3000/get-senser-by-device-id/1
router.get("/get-senser-by-device-id/:id?",function(req,res,next){
    var id = req.params.id;
    SenserInfo.getSensorByDeviceId(id, function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

//http://localhost:3000/gget-senser-by-farm-id/1
router.get("/get-senser-by-farm-id/:id?/:page?",function(req,res,next){
    var id = req.params.id;
    var page = req.params.page;
    SenserInfo.getSensorByFarmId(id, page, function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

//http://localhost:3000/gget-senser-by-farm-id/1
router.get("/get-senser-by-farm-id-and-deviceId/:farmId?/:deviceId?/:page?",function(req,res,next){
    var farmId = req.params.farmId;
    var deviceId = req.params.deviceId;
    var page = req.params.page;
    SenserInfo.getSensorByFarmAnDeviceIdId(farmId, deviceId, page, function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

router.get("/get-sensers/:page?", function(req, res, next){
    var page = req.params.page;
    if(page < 0){
        page = 0;
    }
    SenserInfo.getSenserDataByCreateDate(page, function(err, rows){
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