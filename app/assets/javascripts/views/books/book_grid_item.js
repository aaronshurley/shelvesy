Shelvesy.Views.BookGridItemShow = Backbone.CompositeView.extend({
  template: JST['books/grid_item'],
  className: 'book-grid-item',
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderBtn);
    this.renderBtn();
    this.renderStarRating();
  },

  render: function () {
    var content = this.template({
      book: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    
    return this;
  },
  
  renderBtn: function() {
    var btnView = new Shelvesy.Views.BookAddToShelf({
      model: this.model,
      collection: Shelvesy.Collections.shelves
    });
    this.emptySubviews('.book-add-to-shelf-btn');
    this.addSubview('.book-add-to-shelf-btn', btnView);
  },

  renderStarRating: function() {
    this.emptySubviews('.book-star-rating');
    var starView = new Shelvesy.Views.BookStarRating({
        model: this.model.userReview()
    });

    this.addSubview('.book-star-rating', starView);
  }
});