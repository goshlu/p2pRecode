let dictionaryModel = require("../modal/dictionaryModel");

//查询所有借款标
function getAll(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
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
