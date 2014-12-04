Shelvesy.Views.BookShow = Backbone.CompositeView.extend({
  template: JST['books/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.userReview(), 'sync remove', this.renderStarRating);
    this.listenTo(this.model.userReview(), 'sync remove', this.renderUserReview);
    this.listenTo(this.collection, 'sync remove change:rating', this.renderStarRating);
    this.listenTo(this.collection, 'sync remove change:rating', this.renderUserReview);

  },
  
  // TODO: refactor render function, move renders to initialize
  render: function() {
    console.log("BookShow#render");
    var content = this.template({
      book: this.model,
      review: this.model.userReview()
    });
    this.$el.html(content);
    this.renderBtn();
    this.renderReviews();
    this.renderUserReview();

    this.renderStarRating();
    return this;
  },
  
  // renderStarRating: function() {
  //   console.log("BookShow#renderStarRating");
  //   var book_id = this.model.id;
  //   var starView = new Shelvesy.Views.BookStarRating({
  //       model: this.model.userReview()
  //   });
  //   this.emptySubviews('.book-star-rating-container');
  //   this.addSubview('.book-star-rating-container', starView);
  // },
  
  renderStarRating: function() {
    console.log("BookShow#renderStarRating");
    this.emptySubviews('.book-star-rating');
    var book_id = this.model.id;
    var starView = new Shelvesy.Views.BookStarRating({
        model: this.model.userReview()
    });
    this.addSubview('.book-star-rating', starView);
    // $('.book-star-rating').attr("data-book-id", book_id);
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