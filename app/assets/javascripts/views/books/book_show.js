Shelvesy.Views.BookShow = Backbone.CompositeView.extend({
  template: JST['books/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync remove', this.renderStarRating);
    this.listenTo(this.collection, 'sync remove change:rating', this.renderUserReview);
  },
  
  render: function() {
    var content = this.template({
      book: this.model,
      review: this.userReview()
    });
    this.$el.html(content);
    this.renderBtn();
    this.renderStarRating();
    this.renderReviews();
    this.renderUserReview();
    
    return this;
  },
  
  userReview: function () {
    var reviews = this.model.reviews();
    this._user_review = this.model._current_user && 
      reviews.findWhere({user_id: this.model._current_user.id});
    
    return this._user_review;
  },
  
  renderStarRating: function() {
    console.log("BookShow#renderStarRating");
    // $('.book-star-rating').rating({size: 'sm', step: 1, showCaption: false});
    var starView = undefined;
    if (this.userReview()) {
      starView = new Shelvesy.Views.BookStarRating({
        model: this.userReview()
      });
    } else {
      starView = new Shelvesy.Views.BookStarRating({
        model: new Shelvesy.Models.Review()
      });
    }

    var book_id = this.model.id;
    this.emptySubviews('.book-star-rating');
    this.addSubview('.book-star-rating', starView);
    this.$('.book-star-rating').attr("data-book-id", book_id);
  },
  
  renderBtn: function() {
    console.log("BookShow#renderBtn");
    Shelvesy.Collections.shelves.fetch();
    var btnView = new Shelvesy.Views.BookAddToShelf({
      model: this.model,
      collection: Shelvesy.Collections.shelves
    });
    this.emptySubviews('.book-add-to-shelf-btn');
    this.addSubview('.book-add-to-shelf-btn', btnView);
  },
  
  renderUserReview: function() {
    console.log("BookShow#renderUserReview");
    var review;
    if (this.userReview()) {
      review = this.userReview();
    } else {
      review = new Shelvesy.Models.Review({
        book_id: this.model.id
      });
    }
    
    var userReviewShow = new Shelvesy.Views.UserReviewShow({
      model: review,
      collection: this.collection
    });
    this.emptySubviews('.user-review');
    this.addSubview('.user-review', userReviewShow);
  },
  
  renderReviews: function () {
    var listView = new Shelvesy.Views.ReviewListShow({
      collection: this.model.reviews()
    });
    this.emptySubviews('.book-reviews');
    this.addSubview('.book-reviews', listView);
  }
});