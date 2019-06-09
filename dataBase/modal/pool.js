// 1、引入mysql
let mysql=require("mysql");

module.exports.sqlpool=()=>{
    // 2、建立连接
    let pool={
        config:{
            host:"localhost",
            user:"root",
            // password:"12345678a",
            password:"1528483907",
            port:3306,
            database:"orange"
        },
        query:function(sql,arr,callback){
            let pool=mysql.createPool(this.config);
            pool.getConnection((err,connect)=>{
                if(!err){
                    connect.query(sql,arr,callback);
                    connect.release();
                }
            });
        }

    }
    return pool;
}
