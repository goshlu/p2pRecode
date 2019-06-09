// 1、引入mysql
let mysql=require("mysql");
function query(sql,arr,callback){
    // 2、建立连接
    let Myconnect=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"12345678a",
        port:3306,
        database:"orange"
    });
    // 3、开启连接
    Myconnect.connect();
    // 4、sql操作

    Myconnect.query(sql,arr,callback);
}
module.exports={
    query
}