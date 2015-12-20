var co = require('co');
var http = require("http");

function download(url) {

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
        reject(null);
      });
    });
  
}

co(function* (){
  var f1 = yield download('http://www.baidu.com');
    console.log(f1.toString().length);
  var f2 = yield download('http://www.baidu.com');

  console.log(f2.toString().length);
});
console.log(23);