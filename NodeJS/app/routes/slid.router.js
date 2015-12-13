"use strict";


//var  multer  =  require("multer");
var  slidController  =  require("../controllers/slid.controllers.js");
var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;

//var  multerMiddleware  =  multer({ "dest" :  "/tmp/" });
/*
router.post("/slids", multerMiddleware.single("file"),  function (request, response) {
    console.log(request.file.path);  // The full path to the uploaded file
    console.log(request.file.originalname);  // Name of the file on the user's computer
    console.log(request.file.mimetype);  // Mime type of the file

    

});*/

router.route('/slids')
    .get(slidController.list)
    .post(/*multerMiddleware.single("file"),*/slidController.create);

router.route('/slids/:slidId')
    .get(slidController.read);

router.param('slidId',  function (req, res, next, id) {
    req.slidId  =  id;
  
    next();

});