'use strict';
import url from 'url';
import cheerio from "cheerio";



// var  html = '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a><a class="the-link" href="https://githsadfsadfub.com/tmpvar/jsdom">jsdom!</a><a>jsdom!</a></p>',
// $ = cheerio.load(html);

// $('a').each(function () {
//   console.log($(this).get(0).tagName ,$(this).text(),$(this).attr("href"));
// });


// console.log($.html());



class HtmlParser {

  constructor() {

  }

  _get_new_urls(page_url,$){
  	const base="http://baike.baidu.com";
  	const reg = /\/view\/\d+\.htm$/;
  	var links = $("a").toArray().map(function (ele) {
  		return $(ele).attr("href");
  	}).filter(function(value){
  		if(value){
  			return reg.test(value);
  		}
  	}).map(function (ele) {
  		if(ele.indexOf("http://")!==0){
  			return url.resolve(base,ele);
  		}else{
  			return ele;
  		}
  	});
  	return links;
  }

  _get_new_data(page_url,$){

/**
<dd class="lemmaWgt-lemmaTitle-title">
<h1>node.js</h1>
<a href="javascript:;" class="edit-lemma cmn-btn-hover-blue cmn-btn-28 j-edit-link" style="display: inline-block;"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_edit-lemma"></em>编辑</a>
<a class="lock-lemma" target="_blank" href="/view/10812319.htm" title="锁定"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_lock-lemma"></em>锁定</a>
</dd>

<div class="lemma-summary" label-module="lemmaSummary">
<div class="para" label-module="para">JavaScript是一种运行在浏览器的脚本，它简单，轻巧，易于编辑，这种脚本通常用于浏览器的前端编程，但是一位开发者Ryan有一天发现这种前端式的脚本语言可以运行在服务器上的时候，一场席卷全球的风暴就开始了。</div><div class="para" label-module="para"><sup>[1]</sup><a class="sup-anchor" name="ref_[1]_3974030">&nbsp;</a>
Node.js是一个基于Chrome JavaScript运行时建立的平台， 用于方便地搭建响应速度快、易于扩展的网络应用。Node.js 使用<a target="_blank" href="/view/536048.htm">事件驱动</a>， 非阻塞<a target="_blank" href="/subview/300881/11169495.htm">I/O</a> 模型而得以轻量和高效，非常适合在分布式设备上运行的数据密集型的实时应用。</div><div class="para" label-module="para">Node是一个Javascript运行环境(runtime)。实际上它是对Google V8引擎进行了封装。V8引 擎执行Javascript的速度非常快，性能非常好。Node对一些特殊用例进行了优化，提供了替代的API，使得V8在非浏览器环境下运行得更好。</div>
</div>

**/
	var res_data={};
	res_data['url'] = page_url;
	var title_node = $("dd.lemmaWgt-lemmaTitle-title>h1").eq(0);
	res_data['title'] = title_node.text();
	var summary_node = $("div.lemma-summary");
	res_data['summary'] = summary_node.text();



  	return res_data;
  }
  parse(page_url,html_cont){
  	if(!page_url || !html_cont)
  		return [];
  	var $ = cheerio.load(html_cont);
  	var new_urls = this._get_new_urls(page_url,$);
  	var new_data = this._get_new_data(page_url,$);
  	return [new_urls,new_data];
  }


}

export default HtmlParser;