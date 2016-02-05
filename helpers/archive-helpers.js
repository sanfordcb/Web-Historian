var fs = require('fs');
var path = require('path');
var request = require('request');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers.js');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  fs.readFile('../web/archives/sites.txt', 'utf8', function(error, data) {
    if(error) {
      console.log('error!');
    } else {
      var urls = data.split('|');
      urls.pop();
      _.each(urls, function(item) {
        exports.isUrlArchived(item);
      });
    }

  });
};

exports.isUrlInList = function(url, res){
  //modify variable outside of scope?
  var result = false;
  fs.readFile('../web/archives/sites.txt', 'utf8', function(error, data) {
    if(error) {
      console.log('error!');
    } else {
      var urls = data.split('|');
      urls.pop();
      if(!_.contains(urls, url)) {
        exports.addUrlToList(url, res, true);
        //return result = true;
        //console.log(result);
      } else{
        fs.readFile('../web/archives/sites/' + url + '.html', 'utf8', function(error, data){
          if(error){
            console.log(url);
            httpHelpers.sendResponse(res, 'Not Found', 404);
          } else{
            console.log(data);
            httpHelpers.sendResponse(res, data);
          }
        });
      }
    }
  });
};

exports.addUrlToList = function(url, res, bool){
 // if(url.substring(0,13) !== 'http%3A%2F%2F'){
  //  fs.appendFile('../web/archives/sites.txt', 'http:\/\/' + url + '|');
 // }else{ 
    //if(bool){
      fs.appendFile('../web/archives/sites.txt', url + '|');
    //} else{      
      fs.readFile('../web/public/loading.html', 'utf8', function(error, data){
          if(error){
            httpHelpers.sendResponse(res, 'Not Found', 404);
          } else{
            console.log(data);
            httpHelpers.sendResponse(res, data);
          }
      });
    //}
  //}
  
};

exports.isUrlArchived = function(url){
  console.log(url);
  fs.access('../web/archives/sites/' + url + '.html', fs.F_OK, function(error) {
    if(error) {
      exports.downloadUrls(url);
    }
  });
};

exports.downloadUrls = function(url){
  console.log(url);
  request('http://' + url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //write body to .txt file
      fs.writeFile('../web/archives/sites/' + url + '.html', body, 'utf8');
      return;
    }
  });
};

