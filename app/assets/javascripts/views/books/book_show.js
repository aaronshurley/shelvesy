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
    return this;
  },
  
  renderBtn: function() {
    console.log("BookShow#renderBtn");
    var btnView = new Shelvesy.Views.BookAddToShelf({
      collection: Shelvesy.Collections.shelves,
      model: this.model
    });
    this.emptySubviews('.book-add-to-shelf-btn');
    this.addSubview('.book-add-to-shelf-btn', btnView);
  }
});