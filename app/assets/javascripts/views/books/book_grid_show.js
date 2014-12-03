Shelvesy.Views.BookGridShow = Backbone.CompositeView.extend({
  template: JST['books/grid'],
  className: 'book-grid-container',
  
  initialize: function () {
    console.log("BookGridShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  addBook: function (book) {
    console.log("BookGridShow#addBook");
    var itemView = new Shelvesy.Views.BookGridItemShow({
      model: book
    });
    
    var selector = '.book-grid';// + this.model.id;
    this.addSubview(selector, itemView);
  },
  
  render: function () {
    console.log("BookGridShow#render");
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    this.renderBooks();
    return this;
  },
  
  renderBooks: function () {
    console.log("BookGridShow#renderBooks");
    this.collection.each(this.addBook.bind(this));
  }
});