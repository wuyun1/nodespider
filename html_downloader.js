'use strict';
import http from 'http';

class HtmlDownloader {

  // constructor() {
  //   this.count=0;
  // }
  download(url,cb) {
    return  this.downloadYield(url).then(cb).catch(cb);  
  }

 downloadYield(url) {
  return  new Promise(function(resolve, reject) {
        http.get(url, function(res) {
          var data = "";
          res.on('data', function (chunk) {
            data += chunk;
          });
          res.on("end", function() {
            resolve(data);
          });
        }).on("error", function() {          
          resolve("error");
          reject(null);
        });
      });  
  }


}

export default HtmlDownloader;
