var User = require("../models/user.js");

exports.sendRegister = function (req, res) {
    var user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        service: req.body.service,
    });
    user.save();
    res.redirect(req.get('referer'));
};

exports.listRegister = function (req, res) {
    User.find({}, function (err, list) {
        res.render("admin/table/customer.ejs", {
            "listRegister": list
        });
    });

};