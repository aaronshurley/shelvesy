Shelvesy.Views.BookStarRating = Backbone.View.extend({
  // template: JST['books/star_rating'],
  
  events: {
    // $('.book-star-rating').on('rating.change', function (event, value) {
    //   console.log(value);
    // });
    // 'click .book-star-rating':'handleRatingChange'
  },
  
  initialize: function () {
    if (this.model) {
      console.log("GOT IN HERE!");
      this.listenTo(this.model, 'sync', this.render);
    }
    // this.listenTo($('.book-star-rating'), 'rating.change', this.handleRatingChange);
    $('.book-star-rating').on('rating.change', this.handleRatingChange.bind(this));
    $('.book-star-rating').on('rating.clear', this.handleRatingChange.bind(this));
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
  },
  
  handleRatingChange: function (event, value) {
    if (value){
      console.log("handleRatingChange: " + value);
    }
    else {
      console.log("handleRatingChange: clear");
    }
  },
  
  
});