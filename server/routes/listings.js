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
  //Get all employees
  Listings.find(function(err, allListings){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    res.send(allListings);
  });
});

module.exports = router;
