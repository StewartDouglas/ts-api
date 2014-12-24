var yql = require('yql');
var fs = require('fs');

//var url = "http://ec.europa.eu/external_relations/cfsp/sanctions/list/version4/global/global.xml";
//var url = "file:///Users/stewart/Documents/KYC/API/data/EUSanctions.xml"
var url = "http://www.un.org/sc/committees/consolidated.xml";

var getTargetsQuery = "select * from xml where url='" + url + "'";

console.log(getTargetsQuery);

var results = new Array();

new yql.exec(getTargetsQuery, function(response){

	var targets = new Array();
	console.log(response);
	//var targets = response.query.results.whole.entity
	// var individuals = targets.filter(function(target){
	// 	return target.indexOf("Type=\"P") > -1;
	// });

	console.log(targets);

});

	// targets.forEach(function(target){
	// 	var result = Object();
	// 	result.entityType = 
	// })