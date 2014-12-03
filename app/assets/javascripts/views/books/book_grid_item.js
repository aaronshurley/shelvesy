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
    // this.renderBtn();
    // this.renderStarRating();
    return this;
  }
});