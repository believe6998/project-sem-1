var cloudinary = require('cloudinary').v2;
var Package = require("../models/package.js");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;

exports.generatePackageForm = function (req, res) {
    res.render("admin/form/form-package.ejs");
}

exports.savePackage = function (req, res) {
    console.log("Xử lý file.");
    var package= new Package({
        price: req.body.price,
        name: req.body.name,
    });
    if (req.files && req.files.thumbnail != undefined) {
        var fileGettingUploaded = req.files.thumbnail.data;
        cloudinary.uploader
            .upload_stream(function (error, result) {
                var imageUrl = result.url;
                package.thumbnail = imageUrl;
                package.save();
                res.redirect("/admin/package/list");
            })
            .end(fileGettingUploaded);
    } else {
        console.log("Have no file");
        package.thumbnail = "https://www.touchtaiwan.com/images/default.jpg";
        package.save();
        res.redirect("/admin/package/list");
    }

}

exports.listPackage = function (req, res) {
    Package.find({}, function (err, list) {
        res.render("admin/table/package.ejs", {
            "listPackage": list
        });
    });

};
exports.generatePackage = function (req, res) {
    Package.find({}, function (err, list) {
        res.render("client/package.ejs", {
            "listPackage": list
        });
    });

};

exports.deletePackage= function (req, res) {
    Package.findByIdAndRemove(  myid(req.params.id), function(err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));
    });

};

exports.updatePackage = function (req, res) {
    Package.findByIdAndUpdate(req.params.id,req.body, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.redirect(req.get('referer'));
        }
    });
};



