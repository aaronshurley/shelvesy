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

// might not need the below?
$(document).ready(function(){
  Shelvesy.initialize();
});
