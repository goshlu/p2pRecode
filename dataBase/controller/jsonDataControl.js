let jsonModel = require("../modal/jsonModel");

//查询所有员工
function getEmpolyees(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,token, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if(req.method == 'OPTIONS'){
    res.sendStatus(200);
  }else{
    let limit = Number(req.query.limit);
    let index = (req.query.page-1)*limit;
    let data = jsonModel.yuangong.data;
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
  }
}
//查询所有部门
function getDeparts(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,token, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if(req.method == 'OPTIONS'){
    res.sendStatus(200);
  }else{
    res.send(jsonModel.bumen);
  }
}

//获取部门和员工
function getAll(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,token, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if(req.method == 'OPTIONS'){
    res.sendStatus(200);
  }else{
    res.send(jsonModel);
  }
}

//新增员工
function addEmployee(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,token, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  let employee = {...(req.body)};
  console.log(employee);
  if(req.method == 'OPTIONS'){
    res.sendStatus(200);
  }else{
    jsonModel.yuangong.data.unshift(employee);
    jsonModel.yuangong.count = jsonModel.yuangong.data.length;
    res.send("添加成功");
  }
}

module.exports = {
  getEmpolyees,getDeparts,getAll,addEmployee
}
