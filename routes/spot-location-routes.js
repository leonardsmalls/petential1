//******************************************************************
// spot-location-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the Locations
  app.get("/api/spots", function(req, res) {
    var query = {};
    if (req.query.spot_id) {
      query.SpotsId = req.query.Spots_id;
    }

    db.Post.findAll({
      where: query
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  // Get rotue for retrieving a single Location
  app.get("/api/spots/:id", function(req, res) {
    db.Location.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  // Post route for saving a new Location
  app.post("/api/spots", function(req, res) {
    db.Location.create(req.body).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  // DELETE route for deleting Locations
  app.delete("/api/spots/:id", function(req, res) {
    db.Location.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  // PUT route for updating Locations
  app.put("/api/spots", function(req, res) {
    db.Location.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbLocation) {
        res.json(dbLocation);
      });
  });
};
