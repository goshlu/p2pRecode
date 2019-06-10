let mExpress=require("express");
let mRouter=mExpress.Router();
let control=require("../controller/control");
//借贷管理
let tenderControl=require("../controller/tenderControl");
//借贷管理
let dictionaryControl=require("../controller/dictionaryControl");

mRouter.get("/usercapital",control.usercapital);
mRouter.get("/capitaljournal",control.capitaljournal);
mRouter.get("/platformfunds",control.platformfunds);
mRouter.get("/tendercategory",control.tendercategory);
mRouter.get("/tenderall",control.tenderall);

//借贷管理
//获取借款方列表
mRouter.get("/getBorrows",control.getBorrows);
//获取所有借款标列表 （搜索传：name, phone, status, page, limit）
mRouter.get("/getTenderAll",tenderControl.getTenderAll);
//获取所有借款标列表addTender
mRouter.post("/addTender",tenderControl.addTender);

//字典表管理
mRouter.get("/getDictionaries",dictionaryControl.getAll);

// app.get("/Student",function(){});
module.exports=mRouter;
