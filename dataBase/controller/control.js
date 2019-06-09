let userModal=require("../modal/userModal");

// var userName="";
//用户资金处理程序
function usercapital(req,res,next){
	// console.log(req.query);
   let phone=req.query.phone;
   let name=req.query.name;
   let type=req.query.type;
   let id=req.query.id;
   // console.log(usertype);
     res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   userModal.usercapital(id,phone,name,type,function(err,data){
       if(!err){
               res.send(data);
			   // console.log("返回成功");
			   next();
       }else{
           res.send("101,联系管理员");
       }
   });
}
//资金日志处理程序
function capitaljournal(req,res,next){
	// console.log(req.query);
   let phone=req.query.phone;
   let name=req.query.name;
   let type=req.query.type;
   // console.log(usertype);
     res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   userModal.capitaljournal(phone,name,type,function(err,data){
       if(!err){
               res.send(data);
			   // console.log("返回成功");
			   next();
       }else{
           res.send("101,联系管理员");
       }
   });
}
//平台资金 platformfunds
function platformfunds(req,res,next){
	// console.log(req.query);
	let id=req.query.id;
   let account_type=req.query.account_type;
   let type=req.query.type;
   // console.log(usertype);
     res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   userModal.platformfunds(id,account_type,type,function(err,data){
       if(!err){
               res.send(data);
			   // console.log("返回成功");
			   next();
       }else{
           res.send("101,联系管理员");
       }
   });
}
// 借款标类别  tendercategory
function tendercategory(req,res,next){
	// console.log(req.query);
	let id=req.query.id;
   let account_type=req.query.account_type;
   let type=req.query.type;
   // console.log(usertype);
     res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   userModal.tendercategory(id,account_type,type,function(err,data){
       if(!err){
               res.send(data);
			   // console.log("返回成功");
			   next();
       }else{
           res.send("101,联系管理员");
       }
   });
}

//所有借款标 tenderall
function tenderall(req,res,next){
	// console.log(req.query);
	let id=req.query.id;
   let account_type=req.query.account_type;
   let type=req.query.type;
   // console.log(usertype);
     res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   userModal.tenderall(id,account_type,type,function(err,data){
       if(!err){
               res.send(data);
			   // console.log("返回成功");
			   next();
       }else{
           res.send("101,联系管理员");
       }
   });
}


//获取借款方
function getBorrows(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  userModal.getBorrows(req.query,function(err,data){
    if(!err){
      res.send(data);
      next();
    }else{
      res.send('404,联系管理员');
    }
  });

}

module.exports={
    usercapital,capitaljournal,platformfunds,tendercategory,tenderall,getBorrows
}
