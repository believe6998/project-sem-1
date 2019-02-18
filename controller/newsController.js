var cloudinary = require('cloudinary').v2;
var Tiding = require("../models/news.js");

exports.generateNewsForm = function (req, res) {
    res.render("admin/form/form-news.ejs");
}

exports.saveNews = function (req, res) {
    console.log("Xử lý file.");
    var tiding = new Tiding({
        content: req.body.content
    });
    if (req.files && req.files.thumbnail != undefined) {
        var fileGettingUploaded = req.files.thumbnail.data;
        cloudinary.uploader
            .upload_stream(function (error, result) {
                var imageUrl = result.url;
                tiding.thumbnail = imageUrl;
                tiding.save();
                res.redirect("/admin/news/list");
            })
            .end(fileGettingUploaded);
    } else {
        console.log("Have no file");
        tiding.thumbnail = "https://www.touchtaiwan.com/images/default.jpg";
        tiding.save();
        res.redirect("/admin/news/list");
    }

}

exports.listNews = function (req, res) {
    Tiding.find({}, function (err, list) {
        res.render("admin/table/news.ejs", {
            "listTiding": list
        });
    });

};
exports.generateNews = function (req, res) {
    Tiding.find({}, function (err, list) {
        res.render("client/news.ejs", {
            "listTiding": list
        });
    });

};



