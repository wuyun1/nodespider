'use strict';
import http from 'http';

class HtmlDownloader {

 download(url,cb) {
  
        http.get(url, function(res) {
          var data = "";
          res.on('data', function (chunk) {
            data += chunk;
          });
          res.on("end", function() {
            cb(data,url);
          });
        }).on("error", function() {      
          cb(null);
        });

  }


}

export default HtmlDownloader;
