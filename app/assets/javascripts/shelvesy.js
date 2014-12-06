window.Shelvesy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Shelvesy.Routers.Router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
    
  }
};

$(document).ready(function(){
  // TODO: come back to this and fix the global loader?
  var $body = $("body");
  $(document).on({
      ajaxStart: function() { $body.addClass("loading");    },
       ajaxStop: function() { $body.removeClass("loading"); }
  });

  Shelvesy.initialize();

  $('.navbar-form').on('submit', function () {
    event.preventDefault();
    console.log(event.currentTarget.elements[0].value);
    var searchTerm = event.currentTarget.elements[0].value;
    var searchUrl = "#/books/search/?search=" + searchTerm;
    Backbone.history.navigate(searchUrl);
  });
  
  
});
