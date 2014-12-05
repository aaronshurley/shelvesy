Shelvesy.Views.BookListItemShow = Backbone.CompositeView.extend({
  template: JST['books/list_item'],
  className: 'book-list-item',
  
  initialize: function () {
    console.log("BookListItemShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderBtn);
    // this.listenTo(this.model.userReview(), 'sync', this.renderStarRating);
    this.renderBtn();
    this.renderStarRating();
  },

  render: function () {
    console.log("BookListItemShow#render");
    var content = this.template({
      book: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  
  renderBtn: function() {
    console.log("BookListItemShow#renderBtn");
    // Shelvesy.Collections.shelves.fetch();
    
    var btnView = new Shelvesy.Views.BookAddToShelf({
      model: this.model,
      collection: Shelvesy.Collections.shelves
    });
    this.emptySubviews('.book-add-to-shelf-btn');
    this.addSubview('.book-add-to-shelf-btn', btnView);
  },

  renderStarRating: function() {
    console.log("BookListItemShow#renderStarRating");
    var starView = new Shelvesy.Views.BookStarRating({
        model: this.model.userReview()
    });

    this.addSubview('.book-star-rating', starView);
  }
});