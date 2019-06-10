let dictionaryModel = require("../modal/dictionaryModel");

//查询所有借款标
function getAll(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,token, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  /*if (req == 'OPTIONS') {
    header('Access-Control-Allow-Headers:x-requested-with,content-type,token');//浏览器页面ajax跨域请求会请求2次，第一次会发送OPTIONS预请求,不进行处理，直接exit返回，但因为下次发送真正的请求头部有带token，所以这里设置允许下次请求头带token否者下次请求无法成功
    exit("ok");
  }*/

  dictionaryModel.getAll(req.query, function (err, data) {
    if (!err) {
      res.send(data);
      next();
    } else {
      res.send("101,联系管理员");
    }
  });
}

module.exports = {
  getAll
}
