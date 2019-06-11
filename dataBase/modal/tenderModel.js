let pool = require("./pool");

//查询借款标（传id则查单条） 需传 moduleTypeId（1-6） 指明查询对应模块状态的数据
function getTenderAll({id, name, phone, status, page, limit, moduleTypeId}, callback) {
  let arr = [];
  let sql = `SELECT t1.* FROM (
              SELECT a.*,b.name borrowName,b.phone,
              c.name borrowTypeName,d.name refundSourceName,e.name refundMethod,f.name deadlineTypeName,
              g.name yearRateName,h.name manageMonthRateName,i.name coName,j.name riskName,k.name startRateName,
              l.name overtimeRateName,m.name moneyUseName
              FROM tender a
              LEFT JOIN borrower b ON a.mId = b.id
              LEFT JOIN dictionary c ON a.bId = c.id
              LEFT JOIN dictionary d ON a.rsId = d.id
              LEFT JOIN dictionary e ON a.rtId = e.id
              LEFT JOIN dictionary f ON a.deadlineTypeId = f.id
              LEFT JOIN dictionary g ON a.yearRateId = g.id
              LEFT JOIN dictionary h ON a.manageMonthRateId = h.id
              LEFT JOIN dictionary i ON a.coId = i.id
              LEFT JOIN dictionary j ON a.rkId = j.id
              LEFT JOIN dictionary k ON a.rId = k.id
              LEFT JOIN dictionary l ON a.overtimeRateId = l.id
              LEFT JOIN dictionary m ON a.uId = m.id
              ) t1 WHERE t1.isDelete = 0`;
  if(moduleTypeId){
    switch (moduleTypeId) {
      case "1": //新标维护模块
        sql += " and t1.status in (1,2,3)";
        break;
      case "2": //借贷审核模块
        sql += " and t1.status = 1";
        break;
      case "3": //新标上架模块
        sql += " and t1.status = 4";
        break;
      case "4": //进行中标的管理模块
        sql += " and t1.status = 5";
        break;
      case "5": //满标审核模块
        sql += " and t1.status = 6";
        break;
      case "6": //所有借款标模块
        break;
    }
  }
  if (name != "" && name != null && name != "undefined") {
    name = "%" + name + "%";
    sql += " and t1.borrowName like ?";
    arr.push(name);
  }else if (phone != "" && phone != null && phone != "undefined") {
    phone = "%" + phone + "%";
    sql += " and t1.phone like ?";
    arr.push(phone);
  }
  if (status != "" && status != null && status != "undefined") {
    sql += " and t1.status = ?";
    arr.push(Number(status));
    // console.log(usertype);
  }
  if (id != "" && id != null && id != "undefined") {
    sql += " and t1.id = ?";
    arr.push(Number(status));
    // console.log(usertype);
  }
  sql += " ORDER BY t1.addTime DESC";

  console.log(sql);
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
//修改、编辑借款标
function editTender({
                      id,iName,iLName,mId,bId,rsId,rId,rkId,balance,rtId,uId,deadline,deadlineTypeId,
                     coId,isConId,yearRateId,manageMonthRateId,overtimeRateId,status,shelveTime,saleTime,
                     endTime,describle,riskControl,isChoiceness,isNewEnjoy,finishMoney,notes}, callback) {
  let arr = [iName,iLName,Number(mId),Number(bId),Number(rsId),Number(rId),Number(rkId),Number(balance),Number(rtId),Number(uId),Number(deadline),Number(deadlineTypeId),
    Number(coId),Number(isConId),Number(yearRateId),Number(manageMonthRateId),Number(overtimeRateId),Number(status)];
  let sql = `UPDATE tender SET `;
  if(iName!=null && iName!=undefined && iName!=""){
    sql += `iName=?,`;
  }
  if(iLName!=null && iLName!=undefined && iLName!=""){
    sql += `iLName=?,`;
  }
  if(mId!=null && mId!=undefined && mId!=""){
    sql += `mId=${mId},`;
  }
  if(bId!=null && bId!=undefined && bId!=""){
    sql += `bId=${bId},`;
  }
  if(rsId!=null && rsId!=undefined && rsId!=""){
    sql += `rsId=${rsId},`;
  }
  if(rId!=null && rId!=undefined && rId!=""){
    sql += `rId=${rId},`;
  }
  if(rkId!=null && rkId!=undefined && rkId!=""){
    sql += `rkId=${rkId},`;
  }
  if(balance!=null && balance!=undefined && balance!=""){
    sql += `balance=${balance},`;
  }
  if(rtId!=null && rtId!=undefined && rtId!=""){
    sql += `rtId=${rtId},`;
  }
  if(uId!=null && uId!=undefined && uId!=""){
    sql += `uId=${uId},`;
  }
  if(deadline!=null && deadline!=undefined && deadline!=""){
    sql += `deadline=${deadline},`;
  }
  if(deadlineTypeId!=null && deadlineTypeId!=undefined && deadlineTypeId!=""){
    sql += `deadlineTypeId=${deadlineTypeId},`;
  }
  if(coId!=null && coId!=undefined && coId!=""){
    sql += `coId=${coId},`;
  }
  if(isConId!=null && isConId!=undefined && isConId!=""){
    sql += `isConId=${isConId},`;
  }
  if(yearRateId!=null && yearRateId!=undefined && yearRateId!=""){
    sql += `yearRateId=${yearRateId},`;
  }
  if(manageMonthRateId!=null && manageMonthRateId!=undefined && manageMonthRateId!=""){
    sql += `manageMonthRateId=${manageMonthRateId},`;
  }
  if(overtimeRateId!=null && overtimeRateId!=undefined && overtimeRateId!=""){
    sql += `overtimeRateId=${overtimeRateId},`;
  }
  if(status!=null && status!=undefined && status!=""){
    sql += `status=${status},`;
  }
  if(shelveTime!=null && shelveTime!=undefined && shelveTime!=""){
    sql += `shelveTime=${shelveTime},`;
  }
  if(saleTime!=null && saleTime!=undefined && saleTime!=""){
    sql += `saleTime=${saleTime},`;
  }
  if(endTime!=null && endTime!=undefined && endTime!=""){
    sql += `endTime=${endTime},`;
  }
  if(describle!=null && describle!=undefined && describle!=""){
    sql += `describle=${describle},`;
  }
  if(riskControl!=null && riskControl!=undefined && riskControl!=""){
    sql += `riskControl=${riskControl},`;
  }
  if(isChoiceness!=null && isChoiceness!=undefined && isChoiceness!=""){
    sql += `isChoiceness=${isChoiceness},`;
  }
  if(isNewEnjoy!=null && isNewEnjoy!=undefined && isNewEnjoy!=""){
    sql += `isNewEnjoy=${isNewEnjoy},`;
  }
  if(finishMoney!=null && finishMoney!=undefined && finishMoney!=""){
    sql += `finishMoney=${finishMoney},`;
  }
  if(notes!=null && notes!=undefined && notes!=""){
    sql += `notes=${notes},`;
  }
  let lastCommaIndex = sql.lastIndexOf(",");
  sql = sql.slice(0,lastCommaIndex);
  sql += ` where id=${id}`;
  pool.sqlpool().query(sql, arr, callback);
}

//删除、下架借款标
function deleteTender({id}, callback) {
  let sql = `update tender set isDelete=1 where id=${id}`;
  pool.sqlpool().query(sql, callback);
}
//借款标审核
function auditTender({id,status}, callback) {
  let now = new Date();
  let nowStr = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+(now.getDate())+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
  let sql = `update tender set status=${status}, auditTime=? where id=${id}`;
  pool.sqlpool().query(sql, [nowStr],callback);
}

module.exports = {
  getTenderAll,addTender,editTender,deleteTender,auditTender
};
