var express = require('express');
var router = express.Router();
var SinhVien = require('./models/sinhvien');
var DeviceInfo = require('./models/DeviceInfo');

router.get('/:id?',function(req,res,next){
    console.log("req.params.id: ", req.params.id)
    if(req.params.id){

        DeviceInfo.getDeviceInfoById(req.params.id,function(err,rows){
            if(err){
                console.log('error: ', err);
                res.json(err);
            }
            else{
                console.log('row: ', rows);
                rows.name ="Hoang";
                res.json(rows);
            }
        });
    }else{
        // DeviceInfo.insert(function(err, rows){
        //     console.log('row: ', rows);
        //     console.log('error: ', err);
        //     if(err){
        //         res.json(err);
        //     }
        //     else{
        //         res.json(rows);
        //     }
        // });
        var rows = {
            id: 1,
            name:"hoang"
        }
        DeviceInfo.update(rows,function(err,rows){
            if(err){
                console.log('error: ', err);
                res.json(err);
            }
            else{
                console.log('row: ', rows);
                res.json(rows);
            }
        });

        // });
    }
});

router.post('/',function(req,res,next){
    SinhVien.addSV(req.body,function(err,count){
        if(err){
            res.json(err);
        } else{
            res.json(req.body);
        }
    });
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