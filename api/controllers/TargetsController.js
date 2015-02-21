/**
 * TargetsController
 *
 * @description :: Server-side logic for managing Targets
 */

module.exports = {

  /**
   * `TargetsController.all()`
   */
  all: function (req, res) {

    //console.log(req.params);

    var criteria = {};
    criteria = _.merge({},req.body,req.params.all()); // Combine request paramers from URL and request body
    console.log(criteria);

    Targets.find()
      .where(criteria)
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

    //console.log(req.params);

    var criteria = {};
    criteria = _.merge({},req.body,req.params.all()); // Combine request paramers from URL and request body
    //console.log(criteria);

    Targets.find()
      .where(criteria)
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

    console.log(req.params);

    var criteria = {};
    criteria = _.merge({},req.body,req.params.all(),{list_type: "Watchlist"}); // Combine request paramers from URL and request body
    console.log(criteria);

    Targets.find()
      .where(criteria)
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

