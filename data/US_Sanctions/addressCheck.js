var targets = require('./UStargets.json');
var fs = require('fs');

targets.forEach(function(target){

	if(target.addressList)
		console.log(target.addressList);

});