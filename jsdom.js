var jsdom = require("jsdom");

jsdom.env("a.html",  // 这里可以使用文件系统路径，或者网页链接url
	["http://code.jquery.com/jquery.js"],
	function (errors, window) {
		var $ = window.$;
		$("table tr").each(function() {
			if ($(this).find("p").length <= 0) {
				return;
			}
			
			var tds = $(this).children("td");
			
			console.log($(tds[0]).text());
			
			var as = $(tds[1]).find("a");
			as.each(function() {
				console.log($(this).attr("href"), $(this).text());
			});
		});
	}
);

var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./bower_components/jquery/dist/jquery.min.js");

jsdom.env({
  html: '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a></p>',
  src: [jquery],
  done: function (err, window) {
    var $ = window.$;
    console.log("HN Links");
    $("td.title:not(:last) a").each(function () {
      console.log(" -", $(this).text());
    });
  }
});