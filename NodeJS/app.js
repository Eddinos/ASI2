"use strict";

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

// app.js
var express = require("express");
var http = require("http");
var path = require("path");
var defaultRoute = require("./app/routes/default.route.js");
var slidRoute = require("./app/routes/slid.router.js");
var IOController = require("./app/controllers/io.controllers.js");
var io = require('socket.io');
var SlidModel = require("./app/models/slid.model.js")

var app= express();                                       

// init server
var server = http.createServer(app); 
server.listen(CONFIG.port);

//default route 

app.use(defaultRoute);
app.use(slidRoute);

//gestion des webSocket

//IOController.listen(server);


app.use("/Angular", express. static (path.join(__dirname, "public/Angular")));

app.use("/watch", express. static (path.join(__dirname, "public/Angular/watch")));
app.use("/admin", express. static (path.join(__dirname, "public/Angular/admin")));

app.get('/socket', function(req, res){
    IOController.listen(server);
    res.sendfile('./app.html');
});


var jsonPres = {};

app.use("/loadPres",function(request,response,cb){
    //response.send(CONFIG);
    //var dir="presentation_content";
    var extension = '.json';
    fs.readdir(CONFIG.presentationDirectory, function(err, files){
        if(err) console.error(err);
        //var jsonPres = {};
        for (var f in files){
            if(path.extname(files[f]) == extension){
                filePath = CONFIG.presentationDirectory+"/"+files[f];
                fs.readFile(filePath, "utf-8", function(err, data){
                    if(err) console.error(err);
                    jsonObj = JSON.parse(data);
                    jsonPres[jsonObj.id] = jsonObj;
                    //console.log(jsonPres);
                    //response.send("Done");
                });
            }
        }
    });
    response.send("Done");
});


app.use("/savePres",function(request,response,cb){
    var fileName = "presid";
    var filePath = fileName+".pres.json";
    //var filePath = CONFIG.presentationDirectory+"/"+fileName+".pres.json";
    //console.log(jsonPres);
    //console.log(filePath);
    fs.writeFile(filePath, JSON.stri ngify(jsonPres), function (err) {
      if (err) return console.log(err)
      console.log(JSON.stringify(jsonPres))
      console.log('writing to ' + fileName);
    });
    response.send("Done");
    
});

app.use("/testSlidModel",function(request,response,cb){
    var slid0 = {type:"type1",id:"id1",title:"title1",fileName:"filename1",data:"data1"};
    var slid1 = new SlidModel(slid0);
    /*slid1 = new SlidModel();
    slid1.type = "type1";
    slid1.id = "id1";
    slid1.title = "title1";
    slid1.fileName = "filename1";
    //slid1.setData("data1");*/
    SlidModel.create(slid1);
    //response.send(slid1.toString());
    var slid2 = new SlidModel.read("id1");
    //slid2 = new SlidModel(read("id1"));
    response.send(slid2.toString());
    //response.send("OK");
});
