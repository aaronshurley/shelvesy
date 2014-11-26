Shelvesy.Views.BookListItemShow = Backbone.View.extend({
  template: JST['books/list_item'],
  className: 'book-list-item',
  
  initialize: function () {
    console.log("BookListItemShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    console.log("BookListItemShow#render");
    var content = this.template({
      book: this.model
    });
    this.$el.html(content);
    
    return this;
  }
});