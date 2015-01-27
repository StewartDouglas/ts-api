/* --- request.js --- */
/* Accepts a JSON of the target's data from the front end, and forwards to CallValidate 
   to parse. Here I make extensive use of the xmlbuilder package. See the comment at the 
   end of the file for more info, or see https://github.com/oozcitak/xmlbuilder-js/wiki
*/

var builder = require('xmlbuilder'); 
var http = require('http'); // need to change this to https

http.createServer(function(req,res){

	// 1) check request is valid
	try {

		checkJSONValidity(req);

		// 2) build xml request for callvalidate

		generateXMLRequest(req,function(xmlRequest){

		// 3) send request to callvalidate

		// 4) on receipt of response, send to front end

			res.end(xmlRequest);

		});

	}
	catch(err){
		res.end('Sorry, the following error was found in the data supplied: ' + err);
	}

}).listen(8000);

function checkJSONValidity(req){
	// TO DO
	console.log('Checking JSON Validity');
}

function generateXMLRequest(input, callback){
	/* Generate XML using xmlbuilder package*/
	console.log('Generating XML Request');
	var xmlRequest = builder.create('callvalidate')
		.ele('authentication').up() // each call to ele() returns the newly created child node
		.ele('sessions').up()       // the up() method returns us to the parent node
			.ele('session')
				.ele('data')
					.ele('PersonalInformation')
						.ele('IndividualDetails').up()
						.ele('AddressDetails').up().up().up().up()	// return to root

		.ele('application').up()    
	    .end({pretty: true});	
	callback(xmlRequest);
}

/* 

Example of xmlbuilder:

var builder = require('xmlbuilder');
var xml = builder.create('root')
  .ele('xmlbuilder', {'for': 'node-js'})
    .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
  .end({ pretty: true});

console.log(xml);

will result in:

<?xml version="1.0"?>
<root>
  <xmlbuilder for="node-js">
    <repo type="git">git://github.com/oozcitak/xmlbuilder-js.git</repo>
  </xmlbuilder>
</root>

*/

