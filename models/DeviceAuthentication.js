var db = require('../Dbconnection');

var DeviceAuthentication = {
	getDBName:function(){
		return "DeviceAuthentication";
	},

    createTable:function(){
        return    "CREATE TABLE IF NOT EXISTS " + this.getDBName() +" (" 
        + "deviceId BIGINT(15) NOT NULL ,"
        + "password VARCHAR(60) NOT NULL,"
        + "key_device VARCHAR(60) NOT NULL," 
		+ "create_date BIGINT(15) ," 
        + "PRIMARY KEY(deviceId))";
		
	},
	
	createDB:function(callback){
		return db.query(this.createTable(),callback);
	},

	getDeviceAuthentication:function(obj,callback){
		return db.query("select * from "+ this.getDBName() +" where deviceId='"+obj.id+"' and password='" + obj.password + "'",callback);
	},
	getDeviceAuthenticationByKey:function(key,callback){
		return db.query("select * from "+ this.getDBName() +" where key_device='"+ key + "'",callback);
	},
	insert:function(obj, callback){
		return db.query("Insert into "+ this.getDBName() +"("+ this.getColumSQL() +") values (" + this.getValueSQL(obj) + " )",callback);
	},
	delete:function(id,callback){
		return db.query("delete from "+ this.getDBName() +" where Id=?",[id],callback);
	},
	update:function(obj,callback){
		//console.log(" set password='"+ user.password +"', email='"+ user.email+"', roleType='"+ user.roleType)
		return db.query("update "+ this.getDBName() +" set password='"+ obj.password +"', key_device='"+ obj.key_device+"', create_date='"+ obj.create_date+"'  where deviceId='"+obj.deviceId+"'",callback);
    },
    
    getColumSQL:function(){
        return "deviceId,password,key_device,create_date";
    },

    getValueSQL:function(obj){
		return "'"+ obj.deviceId+"','"+ obj.password + "','"+ obj.key_device + "','"+ obj.create_date +"'"
        // return [device.account,device.email,device.roleType,device.password];
    }

};

module.exports = DeviceAuthentication;