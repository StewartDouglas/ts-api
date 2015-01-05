var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/kyc",function(err,db){
	if(err){
		console.log('Error connecting to Mongo');
	} else {
		console.log('Successfully connected to Mongo');

		require("./US_CongressMembers/USRepresentatives.json").forEach(function(element){
			db.collection('targets').insert(element,{w:0});
		});
		
		require("./US_CongressMembers/USSenators.json").forEach(function(element){
			db.collection('targets').insert(element,{w:0});	
		});		

		require("./World_Bank_Sanctions/WorldBankSanctions.json").forEach(function(element){
			db.collection('targets').insert(element,{w:0});
		});

		console.log("Elements added to MongoDB");	

	}
});