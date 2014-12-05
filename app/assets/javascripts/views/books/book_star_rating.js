Shelvesy.Views.BookStarRating = Backbone.View.extend({
  className: 'book-star-rating',
  
  initialize: function () {
    console.log('cid from book star rating', this.model.cid)
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'destroy', this.onRender);
  },
  
  events: {
    'rating.change': 'handleRatingChange',
    'rating.clear': 'handleRatingChange'
  },

  render: function() {
    console.log("BookStarRating#render");
    this.onRender(1000);
    return this;
  },
  
  // removeView: function () {
  //   console.log("BookStarRating#REMOVE");
  //   this.remove();
  // },
  
  onRender: function (timeout) {
    console.log("BookStarRating#onRender");
    console.log(this.model.cid);
    // if (this.$el.find('.star-rating').length > 0) {
//       console.log("IN HERE");
//       this.$el.html.empty();
//     }
    setTimeout(function () {
      this.$el.rating({ size: 'sm', step: 1, showCaption: false });
      if (this.model.attributes.rating) {
        this.$el.rating('update', this.model.attributes.rating);
      } else {
        this.$el.rating('update', 0);
      }
    }.bind(this), timeout);
  },
  
  handleRatingChange: function (event, value) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    if (value){
      console.log("handleRatingChange: " + value);
      if (!this.model.collection && this.collection) {
        console.log("CHANGE w/ collection");
        this.model.set({
          rating: value
        });
        this.model.save({}, {
          success: function () {
            this.collection.add(this.model);
          }.bind(this)
        });
      } else {
        console.log("CHANGE w/o collection");
        this.model.set({
          rating: value
        });
        this.model.save();
      }
    }
    // delete review if no body???
    else {
      console.log("handleRatingChange: clear");
      if (!this.model.collection && this.collection) {
        console.log("CLEAR w/ collection");
        this.model.set({
          rating: null
        });
        if (!this.model.attributes.body) {
          var book_id = this.model.get('book_id');
          var user_id = this.model.get('user_id');
          this.model.destroy();
          this.model.clear();
          this.model.set('book_id', book_id);
          this.model.set('user_id', user_id);
        } else {
          this.model.save({}, {
            success: function () {
              this.collection.add(this.model);
            }.bind(this),
          })
        }
      } else {
        console.log("CLEAR w/o collection");
        this.model.set({
          rating: null
        });
        if (!this.model.attributes.body) {
          var book_id = this.model.get('book_id');
          var user_id = this.model.get('user_id');
          this.model.destroy();
          this.model.clear();
          this.model.set('book_id', book_id);
          this.model.set('user_id', user_id);
        } else {
          this.model.save();
        }
      }
    }
  }
});