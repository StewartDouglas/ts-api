var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/kyc",function(err,db){
	if(err){
		console.log('Error connecting to Mongo');
	} else {
		console.log('Successfully connected to Mongo');
		
		// require("./UK_MPs/uk_mps.json").forEach(function(element){
		// 	db.collection('targets').insert(element,{w:0});			
		// });

		// require("./US_Sanctions/UStargets.json").forEach(function(element){
		// 	db.collection('targets').insert(element,{w:0});
		// });

		// require("./UK_Sanctions/UKtargets.json").forEach(function(element){
		// 	db.collection('targets').insert(element,{w:0});
		// });	

		// require("./CIA_PEPs/CIAWorldLeaders.json").forEach(function(element){
		// 	db.collection('targets').insert(element,{w:0});
		// });

		require("./UN_Sanctions/UNSanctionsFinal.json").forEach(function(element){
			db.collection('targets').insert(element,{w:0});
		});

		// require("./EU_Sanctions/EUSanctions.json").forEach(function(element){
		// 	db.collection('targets').insert(element,{w:0});
		// });

		console.log("Elements added to MongoDB");	

	}
});