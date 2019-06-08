let mExpress = require("express");
// 1、引用mysql
let mysql = require("mysql");
let app = mExpress();
let logger = require("morgan");
let bodyParser = require("body-parser");
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// let cookieParser = require("cookie-parser");
// let session = require("express-session");
// app.use(cookieParser());
// app.use(session({
//     name: "appS",
//     secret: "12345",
//     cookie: {
//         maxAge: 4000
//     },
//     rolling: true,
//     resave: true
// }));

let mRouter = require("./router/router");
app.use(mRouter);
app.listen(8888, function () {
    console.log("服务启动");
});