Shelvesy.Views.BooksIndex = Backbone.CompositeView.extend({
  template: JST['books/index'],
  className: '.book-index',
  
  initialize: function () {
    if (arguments && arguments[1] && arguments[1].heading) {
      this._heading = arguments[1].heading;
    }
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function() {
    if (!this._heading) {
      this._heading = "All Books";
    }
    var content = this.template({
      count: this.collection.length,
      heading: this._heading
    });
    this.$el.html(content);
    this.renderBookList();
    return this;
  },
  
  renderBookList: function() {
    var showView = new Shelvesy.Views.BookListShow({
      collection: this.collection
    });
    this.addSubview('.books-list', showView);
  }
});