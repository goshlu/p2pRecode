let pool = require("./pool");

//所有借款标 需传 moduleTypeId（1-6） 指明查询对应模块状态的数据
function getTenderAll({name, phone, status, page, limit, moduleTypeId}, callback) {
  let arr = [];
  let sql = `SELECT t1.* FROM (
              SELECT a.*,b.name borrowName,b.phone,
              c.name borrowTypeName,d.name refundSourceName,e.name refundMethod,f.name deadlineTypeName,
              g.name yearRateName,h.name manageMonthRateName,i.name coName
              FROM tender a
              LEFT JOIN borrower b ON a.mId = b.id
              LEFT JOIN dictionary c ON a.bId = c.id
              LEFT JOIN dictionary d ON a.rsId = d.id
              LEFT JOIN dictionary e ON a.rtId = e.id
              LEFT JOIN dictionary f ON a.deadlineTypeId = f.id
              LEFT JOIN dictionary g ON a.yearRateId = g.id
              LEFT JOIN dictionary h ON a.manageMonthRateId = h.id
              LEFT JOIN dictionary i ON a.coId = i.id
              ) t1 where t1.isDelete = 0`;
  if(moduleTypeId){
    switch (moduleTypeId) {
      case "1": //新标维护模块
        sql += " and status in (1,2,3)";
        break;
      case "2": //借贷审核模块
        sql += " and status = 1";
        break;
      case "3": //新标上架模块
        sql += " and status = 4";
        break;
      case "4": //进行中标的管理模块
        sql += " and status = 5";
        break;
      case "5": //满标审核模块
        sql += " and status = 6";
        break;
      case "6": //所有借款标模块
        break;
    }
  }
  if (name) {
    name = "%" + name + "%";
    sql += " and name like ?";
    arr.push(name);
  }else if (phone) {
    phone = "%" + phone + "%";
    sql += " and id like ?";
    arr.push(phone);
  }
  if (status) {
    sql += " and status = ?";
    arr.push(status);
    // console.log(usertype);
  }
  sql += " ORDER BY t1.addTime DESC";

  // sql += " limit ?,?";
  // arr.push((page-1)*limit);
  // arr.push(Number(limit));
  pool.sqlpool().query(sql, arr, callback);
  // console.log(arr);
}

//添加借款标
function addTender({
                     iName,iLName,mId,bId,rsId,rId,rkId,balance,rtId,uId,deadline,deadlineTypeId,
                     coId,isConId,yearRateId,manageMonthRateId,overtimeRateId,status}, callback) {
  let arr = [iName,iLName,Number(mId),Number(bId),Number(rsId),Number(rId),Number(rkId),Number(balance),Number(rtId),Number(uId),Number(deadline),Number(deadlineTypeId),
    Number(coId),Number(isConId),Number(yearRateId),Number(manageMonthRateId),Number(overtimeRateId),Number(status)];
  let sql = `insert into tender (iName,iLName,mId,bId,rsId,rId,rkId,balance,rtId,uId,deadline,deadlineTypeId,coId,isConId,yearRateId,manageMonthRateId,overtimeRateId,status,`;
  if(status == 1){ //提交审核
    let nowTime = new Date();
    sql += `addTime,submitTime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    arr.push(nowTime);
    arr.push(nowTime);
  }else if(status == 2){
    let nowTime = new Date();
    sql += `addTime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    arr.push(nowTime);
  }
  pool.sqlpool().query(sql, arr, callback);
}

module.exports = {
  getTenderAll,addTender
};
