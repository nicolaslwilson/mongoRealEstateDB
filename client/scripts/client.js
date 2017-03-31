var realEstateListingsApp = function () {
  var exports = {};
  exports.refreshListings = function () {
    getListings();
  };
  var appendListings = function (listingsArray) {
    for (var i = 0; i < listingsArray.length; i++) {
      $('#listingsContainer').append(createListingElement(listingsArray[i]));
    }
  };
  var createListingElement = function (listingObject) {
    var type = listingObject.cost ? "sale" : "rent";
    var $el = $('<div>')
              .addClass('listing')
              .addClass('col-xs-12 col-sm-6 col-md-4')
              .addClass(type)
              .data("id", listingObject._id)
              .append(
                $('<p>')
                .text("For" + type)
              );
    return $el;
  };
  //AJAX functions
  var getListings = function () {
    $.ajax({
      url: '/listings',
      type: 'GET',
      success: function (response) {
        console.log(response);
        appendListings(response);
      }
    });

  };

  return exports;
}();

$(document).ready(function() {
  console.log("jQuery loads");
  realEstateListingsApp.refreshListings();
});
