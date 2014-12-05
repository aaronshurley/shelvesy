Shelvesy.Views.ShelfShow = Backbone.CompositeView.extend({
  template: JST['shelves/show'],
  className: 'shelf-show',
  
  initialize: function () {
    console.log("ShelfShow#init");
    this.collection = this.model.books();
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    console.log("ShelfShow#render");
    var content = this.template({
      shelf: this.model
    });
    this.$el.html(content);
    this.renderBookList();
    return this;
  },
  
  renderBookList: function() {
    console.log("ShelfShow#renderBookList");
    var showView = new Shelvesy.Views.BookListShow({
      collection: this.collection
    });
    this.addSubview('.shelf-books', showView);
  }
});