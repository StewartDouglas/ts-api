var targets = require('./UStargets.json');
var fs = require('fs');

var results = Array();

targets.forEach(function(target){

	var entity = new Object();
	
	entity.object = "Individual";
	entity.list_type = "Watchlist";
	entity.data_source = "US Sanctions List";
	entity.uri = "http://www.treasury.gov/resource-center/sanctions/SDN-List/Pages/consolidated.aspx";

	entity.fullName = target.firstName + " " + target.lastName;
	var tempFirstName = target.firstName.split(" ");
	entity.first_name = tempFirstName[0];
	entity.last_name = target.lastName;
	
	if(target.addressList){
		if(target.addressList.address.city)		
			entity.address_city = target.addressList.address.city;
		if(target.addressList.address.stateOrProvince)		
			entity.address_province = target.addressList.address.stateOrProvince;
		if(target.addressList.address.country)		
			entity.nationality = 'Palestine';
			entity.address_country = 'Palestine'; // all entries with a country are Palestinian (by inspection)
	}

	if(target.akaList){
		entity.aka_list = new Object();
		if(target.akaList.aka.length === 2){
			entity.aka_list.aka1 = target.akaList.aka[0];
			entity.aka_list.aka2 = target.akaList.aka[1];
		} else if(target.akaList.aka.length === 3){
			entity.aka_list.aka1 = target.akaList.aka[0];
			entity.aka_list.aka2 = target.akaList.aka[1];
			entity.aka_list.aka3 = target.akaList.aka[2];
		} else {
			entity.aka_list.aka1 = target.akaList.aka;
		}

	}

	results.push(entity);
});

// save file
saveToJSON(results, './UStargetsUpdated.json')

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
