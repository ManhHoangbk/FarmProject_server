var mysql=require('mysql');
var connection=mysql.createPool({
 
host:'localhost',
 user:'root',
 password:'1',
 database:'FarmProject'
 
});
module.exports=connection;