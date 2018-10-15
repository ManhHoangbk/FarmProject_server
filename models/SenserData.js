var db = require('../Dbconnection');
var _ = require('lodash');

var SenserData = {
	getDBName:function(){
		return "SenserData";
	},

    createTable:function(){
        return   "CREATE TABLE IF NOT EXISTS " +this.getDBName()+ " (" + "id BIGINT(15) NOT NULL AUTO_INCREMENT,"
        + "sensor_id BIGINT(15) NOT NULL ," + "sensor_name VARCHAR(60) ," + "sensor_value DOUBLE ,"
        + "device_id BIGINT(15) NOT NULL ," + "farm_id BIGINT(15) NOT NULL ,"
        + "createDate BIGINT(15) NOT NULL ," + "PRIMARY KEY(id))";
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
	insert:function(senser, callback){
		return db.query("Insert into "+ this.getDBName() +"("+ this.getColumSQL() +") values ( " + this.getValueSQL(senser) + " ) ",callback);
	},
	delete:function(id,callback){
		return db.query("delete from "+ this.getDBName() +" where Id=?",[id],callback);
	},
	update:function(senser,callback){
		return db.query("update "+ this.getDBName() +" set name=? where Id="+device.id,this.getValueSQL(senser),callback);
    },
    
    getColumSQL:function(){
        return "id,sensor_id,sensor_name,sensor_value,device_id,farm_id,createDate";
    },

    getValueSQL:function(senser){
	   // return [device.name];
	   return "'"+ senser.id+"','"+ senser.sensor_id+"','"+ senser.sensor_name + "','"+ senser.sensor_value + "','"+ senser.device_id + "','"+ senser.farm_id + "','"+ senser.createDate +"'"
    }

};

module.exports = SenserData;