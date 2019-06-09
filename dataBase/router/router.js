let mExpress=require("express");
let mRouter=mExpress.Router();
let control=require("../controller/control");
//借贷管理
let tenderControl=require("../controller/tenderControl");

mRouter.get("/usercapital",control.usercapital);
mRouter.get("/capitaljournal",control.capitaljournal);
mRouter.get("/platformfunds",control.platformfunds);
mRouter.get("/tendercategory",control.tendercategory);
mRouter.get("/tenderall",control.tenderall);

//获取借款方列表
mRouter.get("/getBorrows",control.getBorrows);

//借贷管理路由
mRouter.get("/elements",tenderControl.getTenderAll);
// app.get("/Student",function(){});
module.exports=mRouter;
