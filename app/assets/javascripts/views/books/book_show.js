Shelvesy.Views.BookShow = Backbone.CompositeView.extend({
  template: JST['books/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    var content = this.template({
      book: this.model
    });
    this.$el.html(content);
    this.renderBtn();
    this.renderStarRating();
    this.renderReviews();
    return this;
  },
  
  renderStarRating: function() {
    console.log("BookShow#renderStarRating");
    $('.book-star-rating').rating({size: 'sm', step: 1, showCaption: false});
    // var starView = new Shelvesy.Views.BookStarRating({
    //   model: this.model
    // });
    // this.emptySubviews('.book-star-rating');
    // this.addSubview('.book-star-rating', starView);
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
  
  renderReviews: function () {
    var listView = new Shelvesy.Views.ReviewListShow({
      collection: this.model.reviews()
    });
    this.emptySubviews('.book-reviews');
    this.addSubview('.book-reviews', listView);
  }
});