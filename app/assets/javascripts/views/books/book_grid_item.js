Shelvesy.Views.BookGridItemShow = Backbone.CompositeView.extend({
  template: JST['books/grid_item'],
  className: 'book-grid-item',
  
  initialize: function () {
    console.log("BookGridItemShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderBtn);
    this.listenTo(this.model.userReview(), 'sync', this.renderStarRating);
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
    this.$('button').addClass('btn-sm');
    // TODO: finish for popover average rating
    // this.$('.ave-rating-' + this.model.id).rating({size: 'xs', showClear: false, showCaption: false, readOnly: true, disabled: true});
    // this.$('.ave-rating-' + this.model.id).rating('update', this.model.escape('rating'));
    
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

    this.addSubview('.book-star-rating', starView);
  }
});