let pool=require("./pool");

//所有借款标
function getTenderAll(id,account_type,type,callback) {
	// console.log("进入数据库")
	let arr=[];
    let sql = `select * from tender where 1=1`;
	 if(id){
	    id="%"+id+"%";
	    sql+=" and id like ? "
	    arr.push(id);
	}
	 if(account_type){
	    if(account_type==0){
	   			 account_type=="";
	   }else{
	   			   account_type="%"+account_type+"%";
	   			 sql+=" and account_type like ? "
	   			 arr.push(account_type);
	   }
	}
	 if(type){
		 if(type==0){
			 type=="";
		 }else{
			   type="%"+type+"%";
			 sql+=" and type like ? "
			 arr.push(type);
		 }
	  
		// console.log(usertype);
	}
    // where staffUser =? and pwd =?`;
    pool.sqlpool().query(sql,arr, callback);
	// console.log(arr);
}

module.exports={
  getTenderAll
};
