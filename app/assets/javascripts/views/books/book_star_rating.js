Shelvesy.Views.BookStarRating = Backbone.View.extend({
  className: 'book-star-rating',
  
  initialize: function () {
    this.listenTo(this.model, 'sync change:rating destroy add', this.render);
  },
  
  events: {
    'rating.change': 'handleRatingChange',
    'rating.clear': 'handleRatingChange'
  },

  render: function() {
    console.log("BookStarRating#render");
    return this;
  },
  
  onRender: function (timeout) {
    console.log("BookStarRating#onRender");
    
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
    else {
      console.log("handleRatingChange: clear");
      this.model.set({
        rating: 0
      });
      this.model.save();
    }
  },
});