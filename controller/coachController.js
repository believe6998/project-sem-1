var cloudinary = require('cloudinary').v2;
var Coach = require("../models/coach.js");

exports.generateCoachForm = function (req, res) {
    res.render("admin/form/form-coach.ejs");
}

exports.saveCoach = function (req, res) {
    console.log("Xử lý file.");
    var coach = new Coach({
        name: req.body.name,
        content: req.body.content
    });
    if (req.files && req.files.thumbnail != undefined) {
        var fileGettingUploaded = req.files.thumbnail.data;
        cloudinary.uploader
            .upload_stream(function (error, result) {
                var imageUrl = result.url;
                coach.thumbnail = imageUrl;
                coach.save();
                res.redirect("/admin/coach/list");
            })
            .end(fileGettingUploaded);
    } else {
        console.log("Have no file");
        coach.thumbnail = "https://www.touchtaiwan.com/images/default.jpg";
        coach.save();
        res.redirect("/admin/coach/list");
    }

}

exports.listCoach = function (req, res) {
    Coach.find({}, function (err, list) {
        res.render("admin/table/coach.ejs", {
            "listCoach": list
        });
    });

};


exports.generateCoach = function (req, res) {
    Coach.find({}, function (err, list) {
        res.render("client/coach.ejs", {
            "listCoach": list
        });
    });

};



