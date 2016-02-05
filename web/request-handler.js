var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var request = require("request");
var fs = require('fs');
// require more modules/folders here!

// Object with different request types
var actions = {
  "GET": function(req, res) {
    httpHelper.serveAssets(res, req.url, res.end);
  },
  "POST": function(req, res) {
    //console.log(req);
    //console.log(res.data);
    var currentData = '';
    req.on('data', function(data){
      currentData += data;
    });
    req.on('end', function(){
      //messages.push(JSON.parse(currentData));
      archive.isUrlInList(currentData.substring(4), res);
    });
  },
  "OPTIONS": function(req, res) {

  }
};

exports.handleRequest = function (req, res) {
  if(actions[req.method]) {
    actions[req.method](req, res);
  } else {
    sendResponse(res, 'Not Found', 404);
  }
};
