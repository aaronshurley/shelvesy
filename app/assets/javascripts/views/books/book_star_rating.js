Shelvesy.Views.BookStarRating = Backbone.View.extend({
  // template: JST['books/star_rating'],
  
  events: {
    
  },
  
  initialize: function () {
    if (this.model) {
      console.log("GOT IN HEREE!");
      this.listenTo(this.model, 'sync', this.render);
    }
  },
  
  render: function() {
    console.log("BookStarRating#render");
    // var content = this.template();
    // this.$el.html(content);
    $('.book-star-rating').rating({size: 'sm', step: 1, showCaption: false});
    if (this.model) {
      $('.book-star-rating').rating('update', this.model.escape('rating'));
    }
    return this;
  }
});