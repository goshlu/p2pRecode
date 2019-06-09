let pool=require("./pool");

//所有借款标
function getTenderAll({name, phone, status},callback) {
	// console.log("进入数据库")
	let arr=[];
    let sql = `select * from tender where 1=1`;
	 if(name){
     name="%"+name+"%";
	    sql+=" and name like ? "
	    arr.push(name);
	}
	 if(phone){
     phone="%"+phone+"%";
     sql+=" and id like ? "
     arr.push(phone);
	}
	 if(status){
     sql+=" and status = ? "
     arr.push(status);
		// console.log(usertype);
	}
    // where staffUser =? and pwd =?`;
    pool.sqlpool().query(sql,arr, callback);
	// console.log(arr);
}

module.exports={
  getTenderAll
};
