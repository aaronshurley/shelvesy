Shelvesy.Views.BookGridItemShow = Backbone.CompositeView.extend({
  template: JST['books/grid_item'],
  className: 'book-grid-item',
  
  initialize: function () {
    console.log("BookGridItemShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    console.log("BookGridItemShow#render");
    var content = this.template({
      book: this.model
    });
    this.$el.html(content);
    this.renderBtn();
    this.renderStarRating();
    return this;
  },
  
  renderBtn: function() {
    console.log("BookGridItemShow#renderBtn");
    Shelvesy.Collections.shelves.fetch();
    
    var btnView = new Shelvesy.Views.BookAddToShelf({
      model: this.model,
      collection: Shelvesy.Collections.shelves
    });
    this.emptySubviews('.book-add-to-shelf-btn');
    this.addSubview('.book-add-to-shelf-btn', btnView);
  },

  renderStarRating: function() {
    console.log("BookGridItemShow#renderStarRating");

    var starView = new Shelvesy.Views.BookStarRating({
        model: this.model.userReview()
    });

    var book_id = this.model.id;
    this.emptySubviews('.book-star-rating');
    this.addSubview('.book-star-rating', starView);
    this.$('.book-star-rating').attr("data-book-id", book_id);
  }
});