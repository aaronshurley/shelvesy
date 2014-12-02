Shelvesy.Views.BookStarRating = Backbone.View.extend({
  template: JST['books/star_rating'],
  
  events: {
    
  },
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    
    console.log("BookStarRating#render");
    var content = this.template();
    this.$el.html(content);
    
    return this;
  }
});