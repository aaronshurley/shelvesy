Shelvesy.Views.ShelfShow = Backbone.CompositeView.extend({
  template: JST['shelves/show'],
  className: 'shelf-show',
  
  initialize: function () {
    this.collection = this.model.books();
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    var content = this.template({
      shelf: this.model
    });
    this.$el.html(content);
    this.renderBookList();
    return this;
  },
  
  renderBookList: function() {
    var showView = new Shelvesy.Views.BookListShow({
      collection: this.collection
    });
    this.addSubview('.shelf-books', showView);
  }
});