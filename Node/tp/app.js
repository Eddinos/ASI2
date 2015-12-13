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

app.use("/watch", express. static (path.join(__dirname, "public/Angular/watch")));
app.use("/admin", express. static (path.join(__dirname, "public/Angular/admin")));


app.use("/loadPres", function(request, response){
	fs.readdir("presentation_content", function(err, files)
	{
		if(err) console.log(err);
		for(var i in files)
		{
			console.log("OK")
			if (path.extname(files[i]) == '.json') 
			{
				console.log(files[i]);
				fs.readFile(CONFIG.presentationDirectory + files[i], "utf8", function(err, data)
				{
					if(err) console.log(err);
					var json = JSON.parse(data);
					response.send(json);
				})
			};
			
		}
	})
})

app.use("/savePres", function(request, response){
	var id = request.param('id');
	var name = request.param('name');
	response.send("id : " + id + " name : " + name)
})