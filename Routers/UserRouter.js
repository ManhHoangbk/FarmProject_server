var express = require('express');
var router = express.Router();
var UserInfo = require('../models/UserInfo');

router.get("/get-all-users",function(req,res,next){
    UserInfo.getAllUserInfos(function(err, rows){
        console.log('err: ', err, ' rows: ', rows)
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

//http://localhost:3000/get-device-by-id/1
router.get("/get-user-by-id/:id?",function(req,res,next){
    var id = req.params.id;
    UserInfo.getDeviceInfoById(id, function(err, rows){
        if(err){
            res.json(err);
        } else{
            res.json(rows);
        }
    });
});

router.post('/updateUser',function(req,res,next){
    var obj = req.body;
    if(obj.id){
        UserInfo.update(obj,function(err,count){
            if(err){
                res.json(err);
            } else{
                res.json(req.body);
            }
        });
    } else{
        UserInfo.insert(obj, function(err, res, next){
            if(err){
                res.json(err);
            } else{
                res.json(req.body);
            }
        })
    }
});

router.post('/login', function(req, res, next){
    var user = req.body;
    console.log("user: ", user)
    UserInfo.getUserInfoById(user.account, function(err, result){
        console.log("err: ", err, "user: ", result)
        if(err){
            res.json(err)
        } else{
            result = result[0];
            if(result != null && result != "undefined" && result.account === user.account){
				if(result.password === user.password){
					user = result;
					user.loginCode = 0//success
				} else{
					user.loginCode = 1;//passwordError
				}
			} else{
				user.loginCode = 2//notFoundUser
            }
            res.json(user)
        }
    })
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