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

var app= express();                                       

// init server
var server = http.createServer(app); 
server.listen(CONFIG.port);

//default route 

app.use(defaultRoute);
app.use(slidRoute);

//gestion des webSocket

//IOController.listen(server);


app.use("/admin", express.static(path.join(__dirname, "public/Angular.js"))); 
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

app.get('/socket', function(req, res){
    IOController.listen(server);
    res.sendfile('./app.html');
});


app.use("/loadpres", function(request,response){
    
    var myArray=[];
    var p = CONFIG.presentationDirectory;
    var path = require("path");
    
    var fs = require('fs');
    var listfilemap ={};
        

    fs.readdir(p,function(err, files){
     if (err) throw err;
        
        for(var i=0; i<=files.length;i++)
        {
                     if (path.extname(files[i]) === ".json")
                {
                    myArray.push(p+"/"+files[i]);
                }

        }          
        
            myArray.forEach(function(jsonfile){
                fs.readFile(jsonfile, function(err,data){
                if (err) throw err;
                    var obj = JSON.parse(data);
                    listfilemap[obj.id]= obj;
                    if (myArray.length===Object.keys(listfilemap).length)
                    {
                        response.send(listfilemap);
                    }
                });
                
            });         
});  
        
});

app.post("/savePres", function(request,response){
    var content ="";
    var Json_String;
    var Json_String_ID;
    var Json_String_Position;
    var Json_String_Path=CONFIG.presentationDirectory;
    var fs = require("fs");


    request.on("data", function(data){


         if(data)   
         {
         content += data;
         }
   
            Json_String_ID= Json_String.id+".pres.json";
            Json_String_Position =Json_String_Path+"/"+Json_String_ID;

        });
    
        request.on("end", function(end){
        fs.writeFileSync(Json_String_Position, content); 
            console.log("JSON SAVED");
            
        
    });
        
    
    
});
