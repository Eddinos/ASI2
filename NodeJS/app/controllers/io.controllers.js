"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);

var slidModel = require('../models/slid.model.js');
var fs = require("fs");
var path = require("path");
var p =CONFIG.contentDirectory;
// Chargement de socket.io
var io = require('socket.io');
var listId = {};

var idMap = {};

var IOController = {};
module.exports = IOController;

IOController.listen = function(server)
{
	var ioServer = io(server);
	ioServer.on('connection', function(socket)
	{
		console.log('connected');
		socket.on('data_comm', function(data) 
		{
			// Do stuff
			idMap[data]=socket;
			console.log(idMap);
			//socket.emit('myEvent2', data);
		});

		socket.on('slidEvent', function(data){
			//if(err) console.log(err);

			var cmd = data.CMD;
			console.log("commande : " + cmd);

			var presId = data.PRES_ID;
			var slid = slidModel.read(presId);
			console.log(slid);
			//slid.src = "/slid/" ;//+ slid.id;

			socket.broadcast.emit(cmd, slid);
		});


	});

	//ioServer.on(io());

	// var socket = io();
 //    socket.emit('myEvent1', "sokcet");
 //    socket.on('myEvent2', function(data){
 //    alert(data);
 //        });
}

// 	io.sockets.on(server, function (socket) {

//     	socket.emit('message', 'Vous êtes bien connecté !');
    	
//     	sockets.on('data_comm', function(data_comm){
//     		listId.keys
// 		});

// 		sockets.on('slidEvent', function(slidEvent){


// 		});
// }
// }