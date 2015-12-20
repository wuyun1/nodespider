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
	  	const lenn = 10000;
	  	let count = 1;
	  	let innercount = 1;
	  	var isEND=false;
	  	// self.downloader.downloadSync(root_url).then(console.log);
	  	self.urls.on("addNewUrl",function () {	  		
	  		if(count>=lenn){				
				return;
			}
			count++;			
			self.downloader.download(self.urls.get_new_url(),function(html_cont,new_url) {
				
				if(isEND){
					return;
				}	
					

				console.log('craw %d  :  %s',innercount,new_url);
				innercount++;
				if(!html_cont) {
					console.log('Error: %d  :  \"%s\" unable access!',innercount-1,new_url);
					return;
				}

				let [new_urls,new_data] = self.parser.parse(new_url, html_cont);
				self.urls.add_new_urls(new_urls);
				self.outputer.collect_data(new_data);
				if(innercount+1>=lenn){	
					isEND=true;				
					self.outputer.output_html();
					return;
				}			

			});
			
		});

	  	self.urls.add_new_url(root_url);
	  }
}

if (true){
	let root_url = "http://baike.baidu.com/view/3974030.htm";
	let obj_spider = new SpiderMain();
	obj_spider.craw(root_url);
}
