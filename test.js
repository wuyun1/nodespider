var urls = new require('./url_manager').default;

var aa = new urls();

console.log(aa.has_new_url());

aa.add_new_url("asfasdf");

console.log(aa.has_new_url());
aa.add_new_url("asfasdf");
aa.add_new_url("asfasdf");

console.log(aa.get_new_url());