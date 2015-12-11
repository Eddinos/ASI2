"use strict";
module.exports = SlidModel;

var CONFIG = require("../../config.json");
process.env.CONFIG = JSON.stringify(CONFIG);
var utils = require('../utils/utils.js');

function SlidModel(slidModel){
    this.type;
    this.id;
    this.title;
    this.fileName;
    var data;
    
//this.id = (slidModel && slidModel.id) ? slidModel.id : null;

this.getData= function(){
    return data;   
}
this.setData= function(val){
    data=val;
}

if (slidModel) {
    if (slidModel.type) {
        this.type = slidModel.type;
    }
    if (slidModel.id) {
        this.id = slidModel.id;
    }
    if (slidModel.title) {
        this.title = slidModel.title;
    } 
    if (slidModel.fileName) {
        this.fileName = slidModel.fileName;
    }
    if (slidModel.getData) {
        this.data = slidModel.getData();
    }

}
}

SlidModel.create= function(slidModel, callback){
    var fs = require("fs");
    var Path =CONFIG.contentDirectory;

//
    if (slidModel.id == null){
        var err = new Error("fail create slid");
        callback(err);
        return;
    }

    var filetowrite = Path + "/" + slidModel.fileName;
    var filetowritemetadata = Path + "/" + slidModel.id + ".meta.json";

    fs.writeFile(filetowritemetadata, JSON.stringify(slidModel),function(err){
     if (err) {
        callback(err);
        return;
    }
       
       fs.writeFile(filetowrite, slidModel.getData(), function(err){
        if (err) {
            callback(err);
            return;
        }
        callback();
    })


   });  
}

SlidModel.read = function(id, callback){
    var fs = require("fs");
    var dirpath =CONFIG.contentDirectory;
    var path = utils.getMetaFilePath(id);
    var slidToRead = new SlidModel();

    if (id == null){
        var err = new Error("fail read slid");
        callback(err);
        return;
    }

    fs.readFile(path, function(err, data){
        if (err) {
                callback(err);
                return;
            }
        var obj = new SlidModel(JSON.parse(data));
        console.log(obj.id);
        callback(null, obj);
    });
}

SlidModel.update = function(slid, callback){
    var fs = require("fs");
    var dirpath =CONFIG.contentDirectory;

    if (slid.id == null){
        var err = new Error("fail update slid");
        callback(err);
        return;
    }

    SlidModel.read(slid.id, function (err, data){
        if(err){
            callback(err);
            return;
        }else{
            SlidModel.create(slid, function(err){
                if(err){
                    callback(err);
                    return;
                }else{
                    callback(err, slid);
                }
            });
        }
    });
}

SlidModel.delete = function(id, callback){

    var fs = require("fs");

    if (id == null){
        var err = new Error("fail delete slid");
        callback(err);
        return;
    }

    SlidModel.read(id, function(err, slid){
        if(err){
            callback(err);
            return;
        }
        var path = utils.getDataFilePath(slid.fileName);
        fs.unlink(path, function(err){
            if(err){
                    callback(err);
                    return;
                }
            fs.unlink(utils.getMetaFilePath(slid.id), function(err){
               if(err){
                    callback(err);
                    return;
                }

                callback();
            });
        });
    });
}