let pool = require("./pool");

//获取字典表列表
function getAll({}, callback) {
  // let arr = [];
  let sql = `select * from dictionary`;
  pool.sqlpool().query(sql, callback);
  // console.log(arr);
}

module.exports = {
  getAll
};
