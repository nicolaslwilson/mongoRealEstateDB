var realEstateListingsApp = function () {
  var exports = {};

  exports.refreshListings = function () {
    getListings();
  };

  exports.submitListing = function (listingObject) {
    postListing(listingObject);
  };

  exports.deleteListing = function (id) {
    deleteListing(id);
  };

  var appendListings = function (listingsArray) {
    for (var i = listingsArray.length - 1; i >= 0; i--) {
      $('#listingsContainer').append(createListingElement(listingsArray[i]));
    }
  };

  var createListingElement = function (listingObject) {
    var type = listingObject.cost ? "Sale" : "Rent";
    var $el = $('<div>')
              .addClass('col-xs-12 col-sm-6 col-md-4 col-lg-3')
              .addClass(type)
              .append(
                $('<div>')
                .addClass('listing-container')
                .data("id", listingObject._id)
                .append(
                  $('<i>')
                  .addClass('glyphicon glyphicon-edit')
                  .addClass('listingActionButton listingEdit')
                )
                .append(
                  $('<i>')
                  .addClass('glyphicon glyphicon-remove')
                  .addClass('listingActionButton listingDelete')
                )
                .append(
                  $('<i>')
                  .addClass('placeholder-icon')
                  .attr('aria-hidden', 'true')
                  .addClass( listingObject.cost ? 'fa fa-home': 'fa fa-building')
                )
                .append(
                  $('<p>')
                  .addClass('square-feet')
                  .text(listingObject.sqft + " Sq. Feet")
                )
                .append(
                  $('<p>')
                  .addClass('price')
                  .text("$" + (listingObject.cost ? (listingObject.cost) : (listingObject.rent + " per Month")))
                )
                .append(
                  $('<p>')
                  .addClass('location')
                  .text(listingObject.city)
                )
                .append(
                  $('<h5>')
                  .addClass('typeFlare')
                  .text("For " + type)
                )
              );
    return $el;
  };

  var showModalAlert = function (type) {
    $('.' + type + '-alert').modal("show");
    setTimeout(function() {   $('.' + type + '-alert').modal("hide"); }, 3000);
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

  var postListing = function (listingObject) {
    $.ajax({
      url: '/listings',
      type: 'POST',
      data: listingObject,
      success: function (response) {
        console.log(response);
        exports.refreshListings();
        showModalAlert("success");
      }
    });

  };

  var deleteListing = function (id) {
    $.ajax({
      url: '/listings/' + id,
      type: 'DELETE',
      success: function (response) {
        console.log(response);
        exports.refreshListings();
        showModalAlert("danger");
      }
    });

  };

  return exports;
}();

var clickAddListing = function () {
  $("#postListingModal").modal("show");
};

var addClickEventListeners = function () {
  $('#addListingButton').on('click', clickAddListing);
  $('#postListingModal form').on('submit', clickSubmit);
  $('#rentRadio').on('click', clickRent);
  $('#saleRadio').on('click', clickSale);
  $('.listingFilterButtonGroup').on('click', 'button', clickFilter);
  // $('#listingsContainer').on('click', '.listingDelete', clickDelete);
};

var clickSubmit = function (event) {
  event.preventDefault();
  var type = $('#postPriceInput').data('type');
  var listingObject = {
    sqft: $('#postSqftInput').val(),
    city: $('#postCityInput').val()
  };
  listingObject[type] = $('#postPriceInput').val();
  realEstateListingsApp.submitListing(listingObject);
  $("#postListingModal").modal("hide");

};

var clickRent = function () {
  $('#postPriceInput').data('type', 'rent');
  $('#priceInputAddon').text(".00 per Month");
};

var clickSale = function () {
  $('#postPriceInput').data('type', 'cost');
  $('#priceInputAddon').text(".00");
};

// var clickDelete = function () {
//   var id = $(this).closest('.listing-container').data("id");
//   console.log("delete click ", id);
//   realEstateListingsApp.deleteListing(id);
// };

var clickFilter = function () {
  var filter = $(this).data("filter");
  $('.listingFilterButtonGroup button').removeClass('active');
  $(this).addClass('active');
  $('#listingsContainer').children().hide();
  $('#listingsContainer').children(filter).show();
};



$(document).ready(function() {
  console.log("jQuery loads");
  realEstateListingsApp.refreshListings();
  addClickEventListeners();
});
