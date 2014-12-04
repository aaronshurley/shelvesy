Shelvesy.Views.BookGridShow = Backbone.CompositeView.extend({
  template: JST['books/grid'],
  className: 'book-grid-container',
  
  initialize: function () {
    // this._bookCount = 0;
    console.log("BookGridShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.renderBooks);
    this.renderBooks();
  },
  
  addBook: function (book) {
    console.log("BookGridShow#addBook");
    var itemView = new Shelvesy.Views.BookGridItemShow({
      model: book
    });
    
    var selector = '.book-grid'; // + this.model.id;
    
    this.addSubview(selector, itemView);
  },
  
  // addBook: function (book) {
  //   console.log("BookGridShow#addBook");
  //   var itemView = new Shelvesy.Views.BookGridItemShow({
  //     model: book
  //   });
  //
  //   if ((this._bookCount === 0) || (this._bookCount % 4 === 0)) {
  //     this.$('.book-grid').append("<div class='row'></div>");
  //   }
  //   var currentRow = this.$('div.row').last();
  //   this.addSubview(currentRow, itemView);
  //   this._bookCount += 1;
  //   // debugger;
  // },
  
  render: function () {
    console.log("BookGridShow#render");
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  
  renderBooks: function () {
    console.log("BookGridShow#renderBooks");
    this.collection.each(this.addBook.bind(this));
  }
});