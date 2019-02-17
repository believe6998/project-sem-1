var homeController = require("../controller/homeController.js");
var fitnessController = require("../controller/fitnessController.js");
var groupexController = require("../controller/groupexController.js");
var kickFitController = require("../controller/kickFitController.js");
var swimController = require("../controller/swimController.js");
var yogaController = require("../controller/yogaController.js");
var membershipController = require("../controller/membershipController.js");
var galleryController = require("../controller/galleryController.js");
var coachController = require("../controller/coachController.js");
var newsController = require("../controller/newsController.js");
var aboutUsController = require("../controller/aboutUsController.js");
var userController = require("../controller/userController.js");
var adminController = require("../controller/adminController.js");


exports.routing = function (app) {
    // client
    app.get("/home", homeController.generateHome);
    app.get("/fitness", fitnessController.generateFitness);
    app.get("/group-ex", groupexController.generateGroupex);
    app.get("/kick-fit", kickFitController.generateKickfit);
    app.get("/swim", swimController.generateSwim);
    app.get("/yoga", yogaController.generateYoga);
    app.get("/membership", membershipController.generateMembership);
    app.get("/gallery", galleryController.generateGallery);
    app.get("/coach", coachController.generateCoach);
    app.get("/news", newsController.generateNews);
    app.get("/about-us", aboutUsController.generateAboutus);

    //admin
    app.get("/admin", adminController.generateAdmin);

    // customer
    app.post("/register/send", userController.sendRegister);
    app.get("/admin/register/list", userController.listRegister);

    //news
    app.get("/admin/news/list", newsController.listNews);
    app.get("/admin/news/form", newsController.generateNewsForm);
    app.post("/admin/news/save", newsController.saveNews);



}