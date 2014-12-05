Shelvesy.Views.BookStarRating = Backbone.View.extend({
  className: 'book-star-rating',
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'destroy', this.removeView);
  },
  
  events: {
    'rating.change': 'handleRatingChange',
    'rating.clear': 'handleRatingChange'
  },

  render: function() {
    console.log("BookStarRating#render");
    this.onRender(0);
    return this;
  },
  
  removeView: function () {
    this.remove();
  },
  
  onRender: function (timeout) {
    console.log("BookStarRating#onRender");
    if (this.$el.find('.star-rating').length > 0) {
      this.emptySubviews('.star-rating');
    }
    setTimeout(function () {
      this.$el.rating({ size: 'sm', step: 1, showCaption: false });
      if (this.model.attributes.rating) {
        this.$el.rating('update', this.model.attributes.rating);
      }
    }.bind(this), timeout);
  },
  
  handleRatingChange: function (event, value) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    if (value){
      console.log("handleRatingChange: " + value);
      this.model.set({
        rating: value
      });
      this.model.save();
    }
    // delete review if no body???
    else {
      console.log("handleRatingChange: clear");
      this.model.set({
        rating: null
      });
      this.model.save();
    }
  },
});