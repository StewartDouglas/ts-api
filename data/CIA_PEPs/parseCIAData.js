var fs = require('fs');
var inputs = require('./data/CIAWorldLeaders/targets.json');

var results = new Array();

inputs.forEach(function(input){
	var leader = Object();
	leader.position = input.position.trim(); // remove leaing and trailing white space
	if(input.name){  // sometimes the leaders name is not listed
		var names = input.name.split(" ");
		// Abstract away from cultural differences e.g Chinese family names come first
		leader.firstName = names[0];
		leader.lastName = names[names.length-1];
		if(names.length > 2){
			var midNames = "";
			for(var i = 1; i < names.length-1; i++){
				midNames = midNames + " " + names[i];
			}
			leader.middleName = midNames.trim();
		}
	}
	leader.nationality = input.country;
	leader.entityType = "Individual";
	leader.dataSource = "CIA"
	leader.URI = "https://www.cia.gov/library/publications/world-leaders-1/index.html";
	leader.listType = "PEP";
	//console.log(leader);	
	results.push(leader)
})

saveToJSON(results,'./CIAWorldLeaders.json');

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