Shelvesy.Views.BookListItemShow = Backbone.CompositeView.extend({
  template: JST['books/list_item'],
  className: 'book-list-item',
  
  initialize: function () {
    console.log("BookListItemShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
  },

  // come back to here
  // renderBtn: function() {
  //   console.log("BookShow#renderBtn");
  //   Shelvesy.Collections.shelves.fetch();
  //   var btnView = new Shelvesy.Views.BookAddToShelf({
  //     model: this.model,
  //     collection: Shelvesy.Collections.shelves
  //   });
  //   this.emptySubviews('.book-add-to-shelf-btn');
  //   this.addSubview('.book-add-to-shelf-btn', btnView);
  // },

  render: function () {
    console.log("BookListItemShow#render");
    var content = this.template({
      book: this.model
    });
    this.$el.html(content);
    // this.renderBtn();
    return this;
  }
});