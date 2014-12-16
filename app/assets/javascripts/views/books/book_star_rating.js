Shelvesy.Views.BookStarRating = Backbone.View.extend({
  className: 'book-star-rating',
  
  initialize: function () {
    console.log('cid from book star rating', this.model.cid)
    this.listenTo(this.model, 'sync change:rating', this.render);
    this.listenTo(this.model, 'destroy', this.onRender);
  },
  
  events: {
    'rating.change': 'handleRatingChange',
    'rating.clear': 'handleRatingChange'
  },

  render: function() {
    // the star rating plugin needs a second to load
    this.onRender(1000);
    return this;
  },
  
  onRender: function (timeout) {
    console.log(this.model.cid);
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
      if (!this.model.collection && this.collection) {
        this.model.set({
          rating: value
        });
        this.model.save({}, {
          success: function () {
            this.collection.add(this.model);
          }.bind(this)
        });
      } else {
        this.model.set({
          rating: value
        });
        this.model.save();
      }
    }
    else {
      if (!this.model.collection && this.collection) {
        this.model.set({
          rating: null
        });
        // delete review if no body
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