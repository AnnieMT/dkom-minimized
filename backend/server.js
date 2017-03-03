/*eslint no-console: 0*/
"use strict";

//////////////////////////////////////////////////////////////////
/// Setting up the enviroment variables
//////////////////////////////////////////////////////////////////
var serviceAPI = ""; // insert URL here; e.g.: https://dkom_python_service.cfapps.sap.hana.ondemand.com

var env = {
	port : process.env.PORT || 3000,
	http : require("http"),
	express : require("express"),
	request : require("request"),
	url : require("url"),
	server : null ,
	serviceHost : serviceAPI
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

//////////////////////////////////////////////////////////////////
/// Creating the server which handles the API Request
//////////////////////////////////////////////////////////////////
var app = env.express();

// to support cross-origin
var corsSettings = function() {
  return function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept' );
		res.setHeader('Access-Control-Allow-Credentials', 'true' );
		res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS' );
    next();
  };
};
app.use(corsSettings());

//////////////////////////////////////////////////////////////////
/// Some mock data
//////////////////////////////////////////////////////////////////
var CustomerData = 
{
	"Data":
	[
		{"id":"42", "type":"person","name":"Dent, Arthur Philip","ownCapital":10000,"rating":"0","age":"28","schufa":"1","loans":"0",
		"transactions":[
			{"id":"1", "accountId":"29", "accountName":"Cash Loan CO.", "accountType":"credit institution", "timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"2", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"3", "accountId":"25", "accountName":"Easy Loan North-West","accountType":"credit institution","timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"4", "accountId":"4","accountName":"Robert Carter","accountType":"person","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"5", "accountId":"29","accountName":"Cash Loan CO.", "accountType":"credit institution","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"out"},
			{"id":"6", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"out"}
		]},
		{"id":"11948", "type":"person","name":"Dawod, Marc","ownCapital":5750,"rating":"0","age":"30","schufa":"0","loans":"5000.00",
		"transactions":[
			{"id":"1", "accountId":"29", "accountName":"Cash Loan CO.", "accountType":"credit institution", "timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"2", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"3", "accountId":"25", "accountName":"Easy Loan North-West","accountType":"credit institution","timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"4", "accountId":"4","accountName":"Robert Carter","accountType":"person","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"}
		]},
		{"id":"81201", "type":"person","name":"Rai, Sascha","ownCapital":12030,"rating":"0","age":"30","schufa":"2","loans":"10000.00",
		"transactions":[
			{"id":"1", "accountId":"29", "accountName":"Cash Loan CO.", "accountType":"credit institution", "timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"2", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"3", "accountId":"25", "accountName":"Easy Loan North-West","accountType":"credit institution","timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"4", "accountId":"4","accountName":"Robert Carter","accountType":"person","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"5", "accountId":"29","accountName":"Cash Loan CO.", "accountType":"credit institution","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"out"},
			{"id":"6", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"out"}
		]},
		{"id":"63031", "type":"person","name":"Mayer, Marc","ownCapital":3203,"rating":"0","age":"35","schufa":"3","loans":"5000.00",
		"transactions":[
			{"id":"1", "accountId":"29", "accountName":"Cash Loan CO.", "accountType":"credit institution", "timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"2", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"3", "accountId":"25", "accountName":"Easy Loan North-West","accountType":"credit institution","timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"4", "accountId":"4","accountName":"Robert Carter","accountType":"person","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"5", "accountId":"29","accountName":"Cash Loan CO.", "accountType":"credit institution","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"out"},
			{"id":"6", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"out"}
		]},
		{"id":"78168", "type":"person","name":"Block, Holger","ownCapital":47600,"rating":"0","age":"20","schufa":"4","loans":"1000.00",
		"transactions":[
			{"id":"1", "accountId":"29", "accountName":"Cash Loan CO.", "accountType":"credit institution", "timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"2", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"3", "accountId":"25", "accountName":"Easy Loan North-West","accountType":"credit institution","timestamp":"2008-06-07T09:36:50.000Z","value":"69476.94" , "transactionType":"in"},
			{"id":"4", "accountId":"4","accountName":"Robert Carter","accountType":"person","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"in"},
			{"id":"5", "accountId":"29","accountName":"Cash Loan CO.", "accountType":"credit institution","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"out"},
			{"id":"6", "accountId":"13","accountName":"Zboncak-Predovic","accountType":"company","timestamp":"2008-06-27T09:36:50.000Z","value":"2476.94" , "transactionType":"out"}
		]}
	]	
};

//////////////////////////////////////////////////////////////////
/// The CustomerManager is responsible to deliver all requested
/// Data for the UI
//////////////////////////////////////////////////////////////////
var CustomerManager = {
	/**
	 * Fetching all Customer Data by a determined ID and returning an JSON Object as string
	 */
	getById: function(pID){
		if(typeof pID !== "undefined" && isNaN(pID) === false){
			for(var i = 0; i < CustomerData.Data.length; i++){
				if(CustomerData.Data[i].id === pID){
					return JSON.stringify(CustomerData.Data[i]);
				}
			}
		}
		// Log error message if pID not valid
		console.log("Customer with pID "+["pID"]+" not found");
		return JSON.stringify({});
	},
	 /**
	 * Fetching a Rating for a Customer by a determined ID and returning a JSON Object as string
	 */
	 getRatingByIdAPI : function(pID, pNetworkRating, pExternalRating, callback){
	 	var call = callback;
		env.request(env.serviceHost +"?id="+pID+"&nrw="+pNetworkRating+"&erw="+pExternalRating,function(error, response, body){
			if(error){
				call(JSON.stringify({ error: error }));
				return console.log("Error:", error); // TODO: why return console.log???
			}
			
			if(response.statusCode !== 200){
				call(JSON.stringify({ error: error }));
				return console.log("Invalid status code returned: ", response.statusCode);
			}
			
			var data;
			try{
				data = JSON.parse(body);
				var color;
				switch (data.V_RATING) {
					case 2:
						color = "#FF8000"; 
						break;
					case 3:
						color = "#C8C8C8"; 
						break;
					case 4:
						color = "#61a656"; 
						break;
					case 5:
						color = "#0080FF"; 
						break;
					case 1:
					default:
						color = "#FF0000"; 
						break;
				}
				data.color = color;	
			}catch(e){
				data = {"ERROR": "JSON error"};
			}
			
			call(JSON.stringify(data));
		});
		return "Calling";
	 },
	 
	 /**
	  * Returns a list for the Customer 
	  */
	  getList : function(){
			return JSON.stringify(CustomerData);
	  }
};

app.get("/",function(req,res){
	var r = res;
	
	r.writeHead(200, {"Content-Type": "application/json"});
	var param = env.url.parse(req.url, true);
	
	if(typeof param.query.option !== "undefined"){
		switch(param.query.option){
			case 'api':
				var networkRating = param.query.networkRating;
				var externalRating = param.query.externalRating;
				var id = param.query.id;
				
				if(typeof networkRating !== "undefined" && typeof externalRating !== "undefined"){
					if(typeof id !== "undefined"){
						CustomerManager.getRatingByIdAPI(id, networkRating, externalRating, function(data){
							r.write(data);
							r.end();
						});
					}else{
						console.log("ID not defined");
						r.end();
					}
				}else{
					console.log("Networkrating or Externalrating not defined");
					r.end();
				}
				break;
			case 'data':
				if(typeof param.query.id !== "undefined" && isNaN(param.query.id) === false){
					r.write(CustomerManager.getById(param.query.id));
					r.end();
				}else{
					r.write("Please add a parameter for the ID");
					r.end();
				}
				break;
			case 'list':
			default:
				r.write(CustomerManager.getList());
				r.end();
			break;
		}		
	}else{
		r.end();
	}
});
app.listen(env.port);