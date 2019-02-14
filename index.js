const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin123@ds015892.mlab.com:15892/project-sem-1', {useNewUrlParser: true});

app.set("views", "views");
app.set("views engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(express.static('public'));

// Tách phần xử lý chức năng routing ra một file bên ngoài.
var router = require("./router/applicationRouter.js");
router.routing(app);

app.listen(9999, function () {
    console.log("Chay thanh cong");
});