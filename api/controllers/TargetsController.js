/**
 * TargetsController
 *
 * @description :: Server-side logic for managing Targets
 */

var valid_parameters = [ 'object',
                     'list_type',
                     'data_source',
                     'full_name',
                     'first_name',
                     'last_name',
                     'aka_list',
                     'id' ]

module.exports = {

  /**
   * `TargetsController.all()`
   */
  all: function (req, res) {

    var criteria = {};
    criteria = _.merge({},req.body,req.params.all()); // Combine request paramers from URL and request body
    console.log(criteria);

    // test that each of the request parameters is valid, if not return 400 Bad Request
    if(criteria != {}) {
      if(!Object.keys(criteria).every(function(key){
        return valid_parameters.indexOf(key) != -1
      })){
        return res.json(400, {Error: 'Invalid request parameters'})
      }
    }

    Targets.find()
      .where(criteria)
      .paginate({page: 2, limit: 30})
      .exec(function(err,results){
            if(err){
              console.log('Error searching the Watchlist');
              return res.json(500, {Error: 'Internal Server Error'}); 
            } else if (results.length === 0) {
              return res.json(404, {Error: 'Not Found'});  
            } else {
              return res.json(200, results);
            }
      });
  },

  /**
   * `TargetsController.pep()`
   */
  peps: function (req, res) {

    var criteria = {};
    criteria = _.merge({},req.body,req.params.all()); // Combine request paramers from URL and request body
    console.log(criteria);

    // test that each of the request parameters is valid, if not return 400 Bad Request
    if(criteria != {}) {
      if(!Object.keys(criteria).every(function(key){
        return valid_parameters.indexOf(key) != -1
      })){
        return res.json(400, {Error: 'Invalid request parameters'})
      }
    }

    Targets.find()
      .where(criteria)
      .paginate({page: 2, limit: 30})      
      .exec(function(err,results){
            if(err){
              console.log('Error searching the Watchlist');
              return res.json(500, {Error: 'Internal Server Error'}); 
            } else if (results.length === 0) {
              return res.json(404, {Error: 'Not Found'});
            } else {
              return res.json(200,results);
            }
      });
  },

  /**
   * `TargetsController.watchlist()`
   */
  watchlists: function (req, res) {

    var criteria = {};
    criteria = _.merge({},req.body,req.params.all(),{list_type: "Watchlist"}); // Combine request paramers from URL and request body
    console.log(criteria);

    // test that each of the request parameters is valid, if not return 400 Bad Request
    if(criteria != {}) {
      if(!Object.keys(criteria).every(function(key){
        return valid_parameters.indexOf(key) != -1
      })){
        return res.json(400, {Error: 'Invalid request parameters'})
      }
    }

    Targets.find()
      .where(criteria)
      .paginate({page: 2, limit: 30})      
      .exec(function(err,results){
            if(err){
              console.log('Error searching the Watchlist');
              return res.json(500, {Error: 'Internal Server Error'}); 
            } else if (results.length === 0) {
              return res.json(404, {Error: 'Not Found'});
            } else {
              return res.json(200, results);
            }
      });

  },
/*
  _config: {
    actions: false,
    shortcust: false,
    rest: false
  }
*/
};

