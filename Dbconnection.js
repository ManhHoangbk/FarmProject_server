var mysql=require('mysql');
// var connection=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'1',
//     database:'FarmProject',
//     port : 3306
// });

var connection=mysql.createPool({
    host:'sl-us-south-1-portal.9.dblayer.com',
    user:'admin',
    password:'TJBXXYJBQVPPOWRH',
    database:'FarmProject',
    port : 25771
});
module.exports=connection;