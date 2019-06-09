let pool=require("./pool");
// 用户资金
function usercapital(id,phone,name,type,callback) {
	// console.log("进入数据库")
	let arr=[];
    let sql = `select * from usercapital where 1=1`;
	 if(phone){
	    phone="%"+phone+"%";
	    sql+=" and phone like ? "
	    arr.push(phone);
	}
	 if(id){
	    id="%"+id+"%";
	    sql+=" and id like ? "
	    arr.push(id);
	}
	 if(name){
	    name="%"+name+"%";
	    sql+=" and name like ? "
	    arr.push(name);
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
// 资金日志
function capitaljournal(phone,name,type,callback) {
	// console.log("进入数据库")
	let arr=[];
    let sql = `select * from capitaljournal where 1=1`;
	 if(phone){
	    phone="%"+phone+"%";
	    sql+=" and phone like ? "
	    arr.push(phone);
	}
	 if(name){
	    name="%"+name+"%";
	    sql+=" and name like ? "
	    arr.push(name);
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
//平台资金
function platformfunds(id,account_type,type,callback) {
	// console.log("进入数据库")
	let arr=[];
    let sql = `select * from platformfunds where 1=1`;
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
//借款标类别tendercategory
function tendercategory(id,account_type,type,callback) {
	// console.log("进入数据库")
	let arr=[];
    let sql = `select * from tendercategory where 1=1`;
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
//所有借款标 tenderall
function tenderall(id,account_type,type,callback) {
	// console.log("进入数据库")
	let arr=[];
    let sql = `select * from tenderall where 1=1`;
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
//获取借款方 
function getBorrows(callback){
	let sql = `select * from borrower`;
	pool.sqlpool().query(sql,callback);
}
module.exports={
    usercapital,capitaljournal,platformfunds,tendercategory,tenderall,getBorrows
};