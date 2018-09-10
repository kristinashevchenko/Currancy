const express = require("express");
//const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

//app.use(cookieParser());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.listen("3030", () => {
    console.log("Server is running");
});
