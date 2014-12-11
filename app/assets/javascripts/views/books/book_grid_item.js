Shelvesy.Views.BookGridItemShow = Backbone.CompositeView.extend({
  template: JST['books/grid_item'],
  className: 'book-grid-item',
  
  initialize: function () {
    console.log("BookGridItemShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderBtn);
    this.renderBtn();
    this.renderStarRating();
  },

  render: function () {
    console.log("BookGridItemShow#render");
    var content = this.template({
      book: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    
    return this;
  },
  
  renderBtn: function() {
    console.log("BookGridItemShow#renderBtn");
    
    var btnView = new Shelvesy.Views.BookAddToShelf({
      model: this.model,
      collection: Shelvesy.Collections.shelves
    });
    this.emptySubviews('.book-add-to-shelf-btn');
    this.addSubview('.book-add-to-shelf-btn', btnView);
  },

  renderStarRating: function() {
    console.log("BookGridItemShow#renderStarRating");
    this.emptySubviews('.book-star-rating');
    var starView = new Shelvesy.Views.BookStarRating({
        model: this.model.userReview()
    });

    this.addSubview('.book-star-rating', starView);
  }
});