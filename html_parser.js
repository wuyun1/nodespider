'use strict';
import url from 'url';
import cheerio from "cheerio";



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