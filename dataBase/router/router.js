let mExpress=require("express");
let mRouter=mExpress.Router();
let control=require("../controller/control");
mRouter.get("/usercapital",control.usercapital);
mRouter.get("/capitaljournal",control.capitaljournal);
mRouter.get("/platformfunds",control.platformfunds);
mRouter.get("/tendercategory",control.tendercategory);
mRouter.get("/tenderall",control.tenderall);
// app.get("/Student",function(){});
module.exports=mRouter;