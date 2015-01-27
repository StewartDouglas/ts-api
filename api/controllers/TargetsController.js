/**
 * TargetsController
 *
 * @description :: Server-side logic for managing Targets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `TargetsController.all()`
   */
  all: function (req, res) {

    console.log(req.params);
    // Combine request paramers from URL and request body

    // TO DO: If no parameters provided then reply 'bad request'
    var criteria = {};
    criteria = _.merge({},req.body,req.params.all());
    console.log(criteria);

    Targets.find()
      .where(criteria)
      .exec(function(err,results){
            if(err){
              console.log('Error searching the Watchlist');
              return res.notFound();
            } else if (results.length === 0) {
              return res.notFound();
            } else {
              return res.json(
                results
              );
            }
      });
  },

  /**
   * `TargetsController.pep()`
   */
  peps: function (req, res) {

    // Combine request paramers from URL and request body
    var criteria = {};
    criteria = _.merge({},req.body,req.params.all(),{list_type: "PEP"});
    console.log(criteria);

    Targets.find()
      .where(criteria)
      .exec(function(err,results){
            if(err){
              console.log('Error searching the Watchlist');
              return res.notFound();
            } else if (results.length === 0) {
              return res.notFound();
            } else {
              return res.json(
                results
              );
            }
      });
  },

  /**
   * `TargetsController.watchlist()`
   */
  watchlists: function (req, res) {

    // Combine request paramers from URL and request body
    var criteria = {};
    criteria = _.merge({},req.body,req.params.all(),{list_type: "Watchlist"});
    console.log(criteria);

    Targets.find()
      .where(criteria)
      .exec(function(err,results){
            if(err){
              console.log('Error searching the Watchlist');
              return res.notFound();
            } else if (results.length === 0) {
              return res.notFound();
            } else {
              return res.json(
                results
              );
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

