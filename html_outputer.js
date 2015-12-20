'use strict';
import fs from 'fs';
import path from 'path';

class HtmlOutPuter {

  constructor() {
  	this.datas=[];
  }
  collect_data(data){
  	if(!data){
  		return;
  	}
  	this.datas.push(data);
  }
  output_html(){
  	var out_cont = "<html>";
  	out_cont += "<body>";
  	out_cont += "<head><meta charset='utf-8' /></head>";
  	out_cont += "<table>";
  	this.datas.forEach(function (data) {
  		out_cont += "<tr>";
  		out_cont += `<td>${ data.url }</td>`;
  		out_cont += `<td>${ data.title }</td>`;
  		out_cont += `<td>${ data.summary }</td>`;
  		out_cont += "</tr>";
  	});
  	out_cont += "</table>";
  	out_cont += "</body>";
  	out_cont += "</html>";

  	fs.writeFileSync(path.join(__dirname, "output.html"), out_cont);

  }

}

export default HtmlOutPuter;