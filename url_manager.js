'use strict';


class UrlManager {

  constructor() {
  	this.urls=[];
  	this.crawed_urls=[];
  }

  add_new_url(new_url){
      if(!new_url){
        return;
      }
  	if(!this.isCrawed(new_url)&&!this.isExist(new_url)){
  		this.urls.push(new_url);
  	}  	
  }
  add_new_urls(urls){
      if(!urls || urls.length==0){
        return;
      }
  	for(var i=0; i<urls.length; i++){
            this.add_new_url(urls[i]);
        } 
  }
  get_new_url(){
  	var url =  this.urls.pop();
  	this.crawed_urls.push(url);
  	return url;
  }

  has_new_url(){
  	return this.urls.length>=1;
  }

  isCrawed(url){
  	return this.crawed_urls.indexOf(url)!==-1;
  }

   isExist(url){
  	return this.urls.indexOf(url)!==-1;
  }

}

export default UrlManager;