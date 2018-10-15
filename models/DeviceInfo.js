var db = require('../Dbconnection');
var _ = require('lodash');

var DeviceInfo = {
	getDBName:function(){
		return "DeviceInfo";
	},

    createTable:function(){
        return  "CREATE TABLE IF NOT EXISTS " + this.getDBName() +" (" 
		+ "id BIGINT(20) NOT NULL AUTO_INCREMENT," 
		+ "name VARCHAR(60) ,"
		+ "PRIMARY KEY(id))";
	},
	
	createDB:function(callback){
		return db.query(this.createTable(),callback);
	},

    getAllDeviceInfos:function(callback){
		return db.query("Select * from " + this.getDBName(),callback);
	},
	getDeviceInfoById:function(id,callback){
		return db.query("select * from "+ this.getDBName() +" where Id="+id,callback);
	},
	insert:function(device, callback){
		return db.query("Insert into "+ this.getDBName() +"("+ this.getColumSQL() +") values(?)", this.getValueSQL(device),callback);
	},
	delete:function(id,callback){
		return db.query("delete from "+ this.getDBName() +" where Id=?",[id],callback);
	},
	update:function(device,callback){
		return db.query("update "+ this.getDBName() +" set name=? where Id="+device.id,this.getValueSQL(device),callback);
    },
    
    getColumSQL:function(){
        return "name";
    },

    getValueSQL:function(device){
        return [device.name];
    }

};

module.exports = DeviceInfo;