var fs = require('fs');
var inputs = require('./UNSanctionsIntermediate.json');

var individuals = inputs["CONSOLIDATED_LIST"]["INDIVIDUALS"][0]["INDIVIDUAL"]

//console.log(inputs);
//console.log(individuals);

var results = new Array();

individuals.forEach(function(individual){
	var target = Object();
	if(individual["FIRST_NAME"])
		target.firstName = individual["FIRST_NAME"][0].trim();
	if(individual["SECOND_NAME"])
		target.secondName = individual["SECOND_NAME"][0].trim();
	if(individual["THIRD_NAME"])
		target.thirdName = individual["THIRD_NAME"][0].trim();
	if(individual["UN_LIST_TYPE"])
		target.UNlistType = individual["UN_LIST_TYPE"][0].trim();
	if(individual["NATIONALITY"])
		target.nationality = individual["NATIONALITY"][0]["VALUE"][0].trim()
	if(individual["DESIGNATION"])
		target.designation = individual["DESIGNATION"][0]["VALUE"][0].trim()
	if(individual["COMMENTS1"])
		target.note = individual["COMMENTS1"][0].trim();
	if(individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["TYPE_OF_DATE"] && individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["TYPE_OF_DATE"] != ""){
		target.dateOfBirth = new Object();
		if(individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["TYPE_OF_DATE"][0] == "Approximately"){
			target.dateOfBirth.typeOfDate = "Approximately";
			target.dateOfBirth.year = individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["YEAR"];
		} 
		if(individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["TYPE_OF_DATE"][0] == "Exact"){
			target.dateOfBirth.typeOfDate = "Exact";
			if(individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["YEAR"]){
				target.dateOfBirth.year = individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["YEAR"][0];
			}
			if(individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["DATE"]){
				target.dateOfBirth.year = individual["INDIVIDUAL_DATE_OF_BIRTH"][0]["DATE"][0];
			}
		}
	};
	if(individual["INDIVIDUAL_PLACE_OF_BIRTH"]){
		target.placeOfBirth = new Object();
		if(individual["INDIVIDUAL_PLACE_OF_BIRTH"][0]["STATE_PROVINCE"]){
			target.placeOfBirth.stateProvince = individual["INDIVIDUAL_PLACE_OF_BIRTH"][0]["STATE_PROVINCE"][0];
		} 
		if(individual["INDIVIDUAL_PLACE_OF_BIRTH"][0]["CITY"]){
			target.placeOfBirth.city = individual["INDIVIDUAL_PLACE_OF_BIRTH"][0]["CITY"][0];

		}
		if(individual["INDIVIDUAL_PLACE_OF_BIRTH"][0]["COUNTRY"]){
			target.placeOfBirth.country = individual["INDIVIDUAL_PLACE_OF_BIRTH"][0]["COUNTRY"][0];

		}
	};		
	target.listType = "Watchlist";
	target.dataSource = "UN Sanctions List";
	target.URI = "http://www.un.org/sc/committees/list_compend.shtml";


	console.log(target);
	results.push(target);
})

saveToJSON(results,'./UNSanctionsFinal.json');

function saveToJSON(results, fileName){

  fs.writeFile(fileName, JSON.stringify(results, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log(results.length + " results saved to JSON.");
      console.log("JSON saved to " + fileName);
    }
  });

}



