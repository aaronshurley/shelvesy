Shelvesy.Views.BookListShow = Backbone.CompositeView.extend({
  template: JST['books/list'],
  className: 'book-list-container',
  
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  addBook: function (book) {
    var itemView = new Shelvesy.Views.BookListItemShow({
      model: book
    });
    
    this.addSubview('.book-list', itemView);
  },
  
  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderBooks();
    return this;
  },
  
  renderBooks: function () {
    this.collection.each(this.addBook.bind(this));
  }
});