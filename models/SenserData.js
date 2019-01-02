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

	saveMultiSenser:function(obj, callback){
		var sensors_data = obj.sensors_data;
        if(sensors_data && sensors_data.length > 0){
            var datas = '';
			var i = 0;
			var timeLong = new Date().getTime();
			if(obj.timestamp ){
				timeLong = new Date(obj.timestamp).getTime();
			}
            sensors_data.forEach(data => {
                data.farm_id = obj.farm_id
                data.device_id = obj.device_id
                data.node_id = obj.node_id
                data.createDate = timeLong;
                datas += "("+ this.getValueSQL(data)+")";
                if(i !== sensors_data.length - 1){
                    datas += ",";
                }
                i++;
			});
			//console.log("Insert into "+ this.getDBName() +"("+ this.getColumSQL() +") values " + datas)
			return db.query("Insert into "+ this.getDBName() +"("+ this.getColumSQL() +") values " + datas ,callback);
        } else{
			console.log('error: ', sensors_data)
		}
		
	},

    getAllDeviceInfos:function(page, callback){
		let limit = 20;
		return db.query("Select * from " + this.getDBName() +" order by createDate DESC limit " + limit + " offset "+ page* limit,callback);
	},

	getSenserDataByCreateDate:function(page, callback){
		let limit = 20;
		var query = "Select * from " + this.getDBName() + " order by createDate DESC limit " + limit + " offset "+ page* limit;
		console.log('query ', query)
		return db.query(query ,callback);
	},

	getDeviceInfoById:function(id,callback){
		return db.query("select * from "+ this.getDBName() +" where Id="+id,callback);
	},

	getSensorByDeviceId:function(id, page,callback){
		let limit = 20;
		return db.query("select * from "+ this.getDBName() +" where device_id="+id  + " order by createDate DESC limit " + limit + " offset "+ page* limit, callback);
	},

	getSensorByFarmId:function(id, page ,callback){
		let limit = 20;
		return db.query("select * from "+ this.getDBName() +" where farm_id="+id + " order by createDate DESC limit " + limit + " offset "+ page* limit,callback);
	},

	getSensorByFarmAnDeviceIdId:function(farm_id, device_id, page ,callback){
		let limit = 20;
		return db.query("select * from "+ this.getDBName() +" where farm_id="+farm_id + " and device_id="+ device_id +" order by createDate DESC limit " + limit + " offset "+ page* limit,callback);
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
        return "sensor_id,sensor_name,sensor_value,device_id,farm_id,createDate";
    },

    getValueSQL:function(senser){
	   // return [device.name];
	   return "'"+ senser.sensor_id+"','"+ senser.sensor_name + "','"+ senser.sensor_value + "','"+ senser.device_id + "','"+ senser.farm_id + "','"+ senser.createDate +"'"
    }

};

module.exports = SenserData;