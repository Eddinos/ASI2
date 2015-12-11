"use strict";

var  CONFIG  =  require("./config.json");
var fs = require("fs");
var express = require("express");
var  http  =  require("http");
var  defaultRoute  =  require("./app/routes/default.route.js");
var path = require("path");
var app = express();

var  server  =  http.createServer(app);
server.listen(CONFIG.port);

app.use(defaultRoute);

// // #2
// app.get("/",  function (request, response) {
//     response.send("It works !");
// });
// // #3
// app.use( function (request, response, cb) {
//     response.send("It works !");
//     cb();
// });

app.use("/Angular", express. static (path.join(__dirname, "public/Angular")));


app.get("/loadPres", function(request, response){
	fs.readdir("tp/presentation_content", function(err, files)
	{
		for(i in files)
		{
			response.send("wouhou");
		}
	})
})

