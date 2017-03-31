var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var ListingSchema = mongoose.Schema({
  cost: Number,
  rent: Number,
  sqft: Number,
  city: String
});

var Listings = mongoose.model("Listings", ListingSchema);

router.get("/", function(req,res){
  //Get all listings
  Listings.find(function(err, allListings){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allListings);
  });
});

router.post("/", function(req,res){
  //Instance of the Model to be saved to the database
  var listing = new Listings();
  listing.city = req.body.city;
  listing.sqft = req.body.sqft;
  listing.cost = req.body.cost;
  listing.rent = req.body.rent;
  listing.save(function(err, savedListing){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    res.send(savedListing);
  });
});

module.exports = router;
