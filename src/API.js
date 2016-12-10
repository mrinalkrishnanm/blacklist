import Request from 'superagent';

var API = {

	mode: "production",

	__root: function() {
		return this.mode === "development" ? "http://localhost:3000/" : "https://whispering-refuge-32373.herokuapp.com/"
	},


	handleRequest: function(res,success,failure) {
		if(res.status == 200)
		{
			var response = JSON.parse(res.text)
			success(response);
		}
		else
			failure(res);
	},

	url: function(path, id) {
		var id = id || null;

		var _baseUrl =  this.__root();

		var _url = _baseUrl + path
		var url = (id == null) ? _url : _url + "/" + id
		return url;

	},

	get: function(url,success,failure) {
		var url = url;
		var _this = this;
		Request.get(url)
		.end((err,res) => {
			_this.handleRequest(res,success,failure)
		})
	},

	post: function(url,data,success,failure) {
		var _this = this;
		console.log(data)
        Request.post(url)
        .set('Authorization', 'Token token='+localStorage.codedammit_token)        
        .send(data)
        .end(function (err,res) {
        	_this.handleRequest(res,success,failure)
        }) 
	},

	put: function(url,data,success,failure) {
       var url = url;
       var _this = this;
       Request.put(url,data)
       .end((err,res) => {
       	    _this.handleRequest(res,success,failure)
       })
	},

	delete: function() {
      
	}

}

module.exports = API; 
