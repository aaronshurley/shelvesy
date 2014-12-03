Shelvesy.Views.BookStarRating = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.model, 'sync change destroy add', this.render);
    $('.book-star-rating').on('rating.change', this.handleRatingChange.bind(this));
    $('.book-star-rating').on('rating.clear', this.handleRatingChange.bind(this));
  },
  
  render: function() {
    console.log("BookStarRating#render");
    $('.book-star-rating').rating({size: 'sm', step: 1, showCaption: false});
    if (this.model.attributes.rating) {
      $('.book-star-rating').rating('update', this.model.escape('rating'));
    }
    
    return this;
  },
  
  handleRatingChange: function (event, value) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    if (value){
      console.log("handleRatingChange: " + value);
      this.model.set({
        rating: value,
        book_id: $target.data('book-id')
      });
      this.model.save();
    }
    else {
      console.log("handleRatingChange: clear");
      this.model.set({
        rating: 0,
        book_id: $target.data('book-id')
      });
      this.model.save();
    }
  },
  
  
});