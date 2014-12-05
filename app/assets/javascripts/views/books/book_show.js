Shelvesy.Views.BookShow = Backbone.CompositeView.extend({
  template: JST['books/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.userReview(), 'sync destroy', this.renderStarRating);
    // this.listenTo(this.model.userReview(), 'sync destroy', this.renderUserReview);
  },
  
  // TODO: refactor render function, move renders to initialize
  render: function() {
    console.log("BookShow#render");
    // not deleting, not updating...
    // this.listenTo(this.model.userReview(), 'destroy', this.renderStarRating);
    this.listenTo(this.model.userReview(), 'sync destroy', this.renderUserReview);
    var content = this.template({
      book: this.model,
      review: this.model.userReview()
    });
    this.$el.html(content);
    this.renderBtn();
    this.renderReviews();
    this.renderUserReview();
    this.renderStarRating();
    this.onRender(1000);
    return this;
  },
  
  renderStarRating: function() {
    console.log("BookShow#renderStarRating");
    this.emptySubviews('.book-star-rating');
    var starView = new Shelvesy.Views.BookStarRating({
        model: this.model.userReview(),
        collection: this.model.reviews()
    });
    this.addSubview('.book-star-rating', starView);
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
    var review = this.model.userReview();
    
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