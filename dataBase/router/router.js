let mExpress=require("express");
let mRouter=mExpress.Router();
let control=require("../controller/control");
//借贷管理
let tenderControl=require("../controller/tenderControl");
//借贷管理
let dictionaryControl=require("../controller/dictionaryControl");

//部门员工
let jsonDataControl=require("../controller/jsonDataControl");

mRouter.all("/usercapital",control.usercapital);
mRouter.all("/capitaljournal",control.capitaljournal);
mRouter.all("/platformfunds",control.platformfunds);
mRouter.all("/tendercategory",control.tendercategory);
mRouter.all("/tenderall",control.tenderall);

//借贷管理
//获取借款方列表
mRouter.all("/getBorrows",control.getBorrows);
//获取所有借款标列表 （搜索传：name, phone, status, page, limit）
mRouter.all("/getTenderAll",tenderControl.getTenderAll);
//添加借款标
mRouter.all("/addTender",tenderControl.addTender);
//修改、编辑借款标
mRouter.all("/editTender",tenderControl.editTender);
//删除，下架借款标
mRouter.all("/deleteTender",tenderControl.deleteTender);
//审核标
mRouter.all("/auditTender",tenderControl.auditTender);

//字典表管理
mRouter.all("/getDictionaries",dictionaryControl.getAll);

//部门、员工
mRouter.all("/getEmpolyees",jsonDataControl.getEmpolyees);
mRouter.all("/getDeparts",jsonDataControl.getDeparts);
mRouter.all("/getAll",jsonDataControl.getAll);
mRouter.all("/addEmployee",jsonDataControl.addEmployee);

// app.get("/Student",function(){});
module.exports=mRouter;
