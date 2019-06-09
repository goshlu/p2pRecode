let tenderModel = require("../modal/tenderModel");

//查询所有借款标
function getTenderAll(req, res, next) {
  console.log(req.query);
  let name = req.query.name;
  let phone = req.query.phone;
  let status = req.query.status;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  tenderModel.getTenderAll(req.query, function (err, data) {
    if (!err) {
      res.send(data);
      // console.log("返回成功");
      next();
    } else {
      res.send("101,联系管理员");
    }
  });
}

module.exports = {
  getTenderAll
}