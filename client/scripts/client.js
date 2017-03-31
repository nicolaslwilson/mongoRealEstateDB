var realEstateListingsApp = function () {
  var exports = {};
  //AJAX functions
  exports.getListings = function () {
    $.ajax({
      url: '/listings',
      type: 'GET',
      success: function (response) {
        console.log(response);
      }
    });

  };

  return exports;
}();

$(document).ready(function() {
  console.log("jQuery loads");
  realEstateListingsApp.getListings();
});
