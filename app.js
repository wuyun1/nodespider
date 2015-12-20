'use strict';
import html_downloader from './html_downloader';
import html_parser from './html_parser';
import html_outputer from './html_outputer';
import url_manager from './url_manager';
import co from 'co';


// root_url = "http://127.0.0.1:3000";

class SpiderMain {

  constructor() {

    this.urls = new url_manager();
    this.downloader = new html_downloader();
    this.parser = new html_parser();
    this.outputer = new html_outputer();
  }

  craw(root_url){
  	let self = this;
  	let count = 1;
  	// self.downloader.downloadSync(root_url).then(console.log);

  	co(function* (){
		
	  	self.urls.add_new_url(root_url);
	  	let html_cont;
	  	while(self.urls.has_new_url()){
	  		try{
	  			let new_url = self.urls.get_new_url();
		  		console.log('craw %d  :  %s',count,new_url);
				html_cont="error";
		  		html_cont =yield self.downloader.downloadYield(new_url);
		  		if(!html_cont||html_cont==="error"){
		  			throw new Error("URL: \""+new_url+"\" unable access!");
		  		}			  		
		  		let [new_urls,new_data] = self.parser.parse(new_url, html_cont);
		  		self.urls.add_new_urls(new_urls);
		  		self.outputer.collect_data(new_data);
		  		
	  		}catch(e){
	  			console.log(e);
	  		}	  			  		
	  		
	  		count++;
	  		if(count>=1000){
	  			break;
	  		}
	  		
	  	}
  		self.outputer.output_html();

	});
  }
}

if (true){
	let root_url = "http://baike.baidu.com/view/3974030.htm";
	let obj_spider = new SpiderMain();
	obj_spider.craw(root_url);
}
