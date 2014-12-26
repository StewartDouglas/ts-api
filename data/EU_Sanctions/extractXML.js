var xml2js = require('xml2js');
var fs = require('fs');
    // parser = require('xml2json'),
    // util = require('util');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/EUSanctions.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
  		fs.writeFile('./data.json',  JSON.stringify(result) , function(err){
  			if(err){
  				console.log('Error: ' + err);
  			} else {
  				console.log(result)
		  		console.log('Done');
  			}
  		});
    });
});