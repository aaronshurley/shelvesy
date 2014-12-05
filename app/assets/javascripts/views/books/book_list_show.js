Shelvesy.Views.BookListShow = Backbone.CompositeView.extend({
  template: JST['books/list'],
  className: 'book-list-container',
  
  initialize: function () {
    console.log("BookListShow#initialize");
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.renderBooks);
    // this.renderBooks();
  },
  
  addBook: function (book) {
    console.log("BookListShow#addBook");
    var itemView = new Shelvesy.Views.BookListItemShow({
      model: book
    });
    
    this.addSubview('.book-list', itemView);
  },
  
  render: function () {
    console.log("BookListShow#render");
    var content = this.template();
    this.$el.html(content);
    this.renderBooks();
    return this;
  },
  
  renderBooks: function () {
    console.log("BookListShow#renderBooks");
    this.collection.each(this.addBook.bind(this));
  }
});