Shelvesy.Views.ShelvesIndex = Backbone.CompositeView.extend({
  template: JST['shelves/index'],
  
  initialize: function () {
    console.log("ShelvesIndex#initialize");
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function() {
    console.log("ShelvesIndex#render");
    var content = this.template({
      shelves: this.collection
    });
    this.$el.html(content);
    this.renderFooter();
    return this;
  },

  renderFooter: function () {
    console.log("ShelvesIndex#render");
    var formView = new Shelvesy.Views.ShelfForm({
      collection: this.collection
    });
    this.addSubview('.shelves-footer', formView);
    // var showView = new Shelvesy.Views.BookListShow({
//       collection: this.collection
//     });
//     this.addSubview('.shelf-books', showView);
  }
});