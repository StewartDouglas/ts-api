var EUdata = require('./dataIntermediate.json');
var fs = require('fs');

var targets = EUdata["WHOLE"]["ENTITY"];
var individuals = new Array();
var enterprises = new Array();

targets.forEach(function(target){

	var entity = new Object();
	entity.listType = "Watchlist";
	entity.dataSource = "EU Sanctions List";
	entity.URI = "http://eeas.europa.eu/cfsp/sanctions/consol-list/index_en.htm";


	if(target['$']['Type'] == 'P'){
		// Target is a person 
		
		entity.entityType = "Individual";

		if(target["NAME"][0]["LASTNAME"][0]) {
			entity.lastName = target["NAME"][0]["LASTNAME"][0].trim() 
		} else if (target["NAME"][0]["WHOLENAME"][0]) {
			var nameArray = target["NAME"][0]["WHOLENAME"][0].split(" ")
			entity.lastName = nameArray[nameArray.length-1]
		}
		if(target["NAME"][0]["FIRSTNAME"][0]) {
			entity.firstName = target["NAME"][0]["FIRSTNAME"][0].trim()
		} else if (target["NAME"][0]["WHOLENAME"][0]) {
			var nameArray = target["NAME"][0]["WHOLENAME"][0].split(" ")
			entity.firstName = nameArray[0]
		}
		if(target["NAME"][0]["MIDDLENAME"][0])
			entity.middleName = target["NAME"][0]["MIDDLENAME"][0].trim()
		if(target["NAME"][0]["WHOLENAME"][0]) {
			entity.fullName = target["NAME"][0]["WHOLENAME"][0].trim()
		} else if (target["NAME"][0]["FIRSTNAME"][0] && target["NAME"][0]["LASTNAME"][0]) {
			entity.fullName = target["NAME"][0]["FIRSTNAME"][0] + " " + target["NAME"][0]["LASTNAME"][0]
		}

		if(target["NAME"][0]["GENDER"][0])
			entity.gender = target["NAME"][0]["GENDER"][0].trim()			
		if(target["NAME"][0]["FUNCTION"][0])
			entity["function"] = target["NAME"][0]["FUNCTION"][0].trim()

		if(target["BIRTH"]) {

			entity.birth = new Object(); // nested object 

			if(target["BIRTH"][0]["DATE"][0])
				entity.birth.date = target["BIRTH"][0]["DATE"][0].trim()
			if(target["BIRTH"][0]["PLACE"][0])
				entity.birth.place = target["BIRTH"][0]["PLACE"][0].trim()
			if(target["BIRTH"][0]["COUNTRY"][0])
				entity.birth.country = target["BIRTH"][0]["COUNTRY"][0].trim()

		}	

		if(target["PASSPORT"]) {

			entity.passport = new Object(); // nested object 

			if(target["PASSPORT"][0]["NUMBER"][0])
				entity.passport.number = target["PASSPORT"][0]["NUMBER"][0].trim()
			if(target["PASSPORT"][0]["COUNTRY"][0])
				entity.passport.country = target["PASSPORT"][0]["COUNTRY"][0].trim()
		}

		//console.log(individual);
		individuals.push(entity);


	} else if (target['$']['Type'] == 'E') {
		// Target is an enterprise

		entity.entityType = "Organisation";


		if(target["NAME"][0]["WHOLENAME"][0])
			entity.fullName = target["NAME"][0]["WHOLENAME"][0].trim();

		if(target["ADDRESS"]){

			entity.address = new Object();

			if(target["ADDRESS"][0]["NUMBER"][0])
				entity.address.number = target["ADDRESS"][0]["NUMBER"][0].trim()
			if(target["ADDRESS"][0]["STREET"][0])
				entity.address.street = target["ADDRESS"][0]["STREET"][0].trim()
			if(target["ADDRESS"][0]["ZIPCODE"][0])
				entity.address.zipcode = target["ADDRESS"][0]["ZIPCODE"][0].trim()
			if(target["ADDRESS"][0]["CITY"][0])
				entity.address.city = target["ADDRESS"][0]["CITY"][0].trim()
			if(target["ADDRESS"][0]["COUNTRY"][0])
				entity.address.country = target["ADDRESS"][0]["COUNTRY"][0].trim()
			if(target["ADDRESS"][0]["OTHER"][0])
				entity.address.other = target["ADDRESS"][0]["OTHER"][0].trim()
		}											

		//console.log(entity);
		enterprises.push(entity);
	}

});

saveToJSON(individuals,'./EUSanctionsIndividualsFinal.json');
saveToJSON(enterprises,'./EUSanctionsOrganisationsFinal.json');

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


