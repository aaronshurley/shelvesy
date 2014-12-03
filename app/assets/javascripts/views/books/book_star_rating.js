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
    if (this.book_id) {
      this._book_id = this.book_id;
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
    
    // this.$('.book-star-rating').attr("data-book-id", this.book_id)
    return this;
  },
  
  handleRatingChange: function (event, value) {
    if (value){
      console.log("handleRatingChange: " + value);
      var $target = $(event.currentTarget);
      // debugger
      if (this.model) {
        this.model.set({rating: value});
        this.model.save();
      } // else {
//         var review = new Shelvesy.Models.Review({
//           user_id: ,
//           book_id: ,
//           rating: value
//         });
//         review.save();
//       }
    }
    else {
      console.log("handleRatingChange: clear");
      if (this.model) {
        this.model.set({rating: 0});
        this.model.save();
      } // else {
//         var review = new Shelvesy.Models.Review({
//           user_id: ,
//           book_id: ,
//           rating: 0
//         });
//         review.save();
//       }
    }
  },
  
  
});