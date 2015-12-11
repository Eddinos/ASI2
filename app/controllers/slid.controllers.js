"use strict";

var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var myModel = require('../models/slid.model.js');
var utils = require('../utils/utils.js');
var fs = require("fs");
var path = require("path");
var p =CONFIG.contentDirectory;
var fileNameArray = [];
var myArray=[];
var listfilemap ={};

var SlidController = {};
module.exports = SlidController;



SlidController.list = function(req, res){

      fs.readdir(p,function(err, files){
        if (err) throw err;
      
            for(var i=0; i<=files.length;i++)
            {
                     if (path.extname(files[i]) === ".json")
                  {
                     myArray.push(p+"/"+files[i]); //path.join(p, files[i])
                  }

            }       

          myArray.forEach(function(jsonfile){
              fs.readFile(jsonfile, function(err,data){
              if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
              }
                  var obj = JSON.parse(data);
                  listfilemap[obj.id]= obj;
                  if (myArray.length===Object.keys(listfilemap).length)
                    {
                      res.send(listfilemap);
                    }
              })
              
          })
       })
  }


  SlidController.create = function(req, res){
    
      req.on("data", function(data){
        
        myModel.create(data);
        res.send("slid en creation!");
      
    });
      req.on("end", function(end){
        
        res.send("slid créé!");
      })
    }

  SlidController.read = function(req,res){
  
   

        var id =req.slidId;       
        var test_json = req.query.json;


      myModel.read(id, function (err,data)

              {
                if (err) {
                      console.error(err);
                    } 
                else {

                      if  (test_json == "true"){

                            res.send(JSON.stringify(data));

                            }
                      else {

                            var test = JSON.stringify(data);
                            var path = utils.getDataFilePath(data.fileName);
                            fs.readFile(path, function(err, data){
                              if (err) {
                                  callback(err);
                                  return;
                              }
                              else {
                                res.send(data);
                              }


                      });
                     }
            }
          });
}

      /*  
        
      if  (test_json == "true"){

              myModel.read(id, function (err,data)
              {
                if (err) {
                      console.error(err);
                    } else {
                      res.send(JSON.stringify(data));

                    }

              })
     


      else {             
              res.send("json egal false");
             }

  }*/
