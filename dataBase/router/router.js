let mExpress=require("express");
let mRouter=mExpress.Router();
let control=require("../controller/control");
//借贷管理
let tenderControl=require("../controller/tenderControl");
//借贷管理
let dictionaryControl=require("../controller/dictionaryControl");

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
//获取所有借款标列表addTender
mRouter.all("/addTender",tenderControl.addTender);

//字典表管理
mRouter.all("/getDictionaries",dictionaryControl.getAll);

// app.get("/Student",function(){});
module.exports=mRouter;
