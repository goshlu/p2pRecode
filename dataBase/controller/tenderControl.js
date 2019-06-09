let tenderModel = require("../modal/tenderModel");

//查询所有借款标
function getTenderAll(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  let limit = Number(req.query.limit);
  let index = (req.query.page-1)*limit;
  tenderModel.getTenderAll(req.query, function (err, data) {
    if (!err) {
      let dataArr = [];
      let count = 0;
      for(let i=index; i<data.length; i++){
        if(count === limit){
          break;
        }
        dataArr.push(data[i]);
        count++;
      }
      res.send({code:0,msg:"成功",data:dataArr,total:data.length});
      // console.log("返回成功");
      next();
    } else {
      console.log(err);
      res.send("101,联系管理员");
    }
  });
}
//添加借款标
function addTender(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  let dataJson = JSON.parse(Object.keys(req.body)[0]);
  // console.log(dataJson);
  tenderModel.addTender(dataJson, function (err, data) {
    if (!err) {
      res.send({code:0,msg:"添加成功"});
      next();
    } else {
      console.log(err);
      res.send("101,联系管理员");
    }
  });
}
//修改、编辑借款标
function editTender(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  let dataJson = JSON.parse(Object.keys(req.body)[0]);
  // console.log(dataJson);
  tenderModel.addTender(dataJson, function (err, data) {
    if (!err) {
      res.send({code:0,msg:"添加成功"});
      next();
    } else {
      console.log(err);
      res.send("101,联系管理员");
    }
  });
}

module.exports = {
  getTenderAll,addTender
}
