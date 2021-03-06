var db = require('../Dbconnection');
var _ = require('lodash');

var UserInfo = {
	getDBName:function(){
		return "UserInfo";
	},

    createTable:function(){
        return    "CREATE TABLE IF NOT EXISTS " + this.getDBName() +" (" 
        + "account VARCHAR(60) NOT NULL ,"
        + "email VARCHAR(60) ,"
        + "roleType INT(15) ,"
        + "password VARCHAR(60) NOT NULL," 
		+ "PRIMARY KEY(account))";
		
	},
	
	createDB:function(callback){
		return db.query(this.createTable(),callback);
	},

    getAllUserInfos:function(callback){
		return db.query("Select * from " + this.getDBName(),callback);
	},
	getUserInfoById:function(id,callback){
		return db.query("select * from "+ this.getDBName() +" where account='"+id+"'",callback);
	},
	insert:function(device, callback){
		return db.query("Insert into "+ this.getDBName() +"("+ this.getColumSQL() +") values (" + this.getValueSQL(device) + " )",callback);
	},
	delete:function(id,callback){
		return db.query("delete from "+ this.getDBName() +" where Id=?",[id],callback);
	},
	update:function(user,callback){
		//console.log(" set password='"+ user.password +"', email='"+ user.email+"', roleType='"+ user.roleType)
		return db.query("update "+ this.getDBName() +" set password='"+ user.password +"', email='"+ user.email+"', roleType='"+ user.roleType+"'  where account='"+user.account+"'",callback);
    },
    
    getColumSQL:function(){
        return "account,email,roleType,password";
    },

    getValueSQL:function(user){
		return "'"+ user.account+"','"+ user.email + "','"+ user.roleType + "','"+ user.password +"'"
        // return [device.account,device.email,device.roleType,device.password];
    }

};

module.exports = UserInfo;