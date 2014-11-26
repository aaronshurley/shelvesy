Shelvesy.Views.BooksIndex = Backbone.View.extend({
  template: JST['books/index'],
  
  initialize: function () {
    console.log("BooksIndex#initialize");
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function() {
    console.log("BooksIndex#render");
    var content = this.template({
      books: this.collection
    });
    this.$el.html(content);
    
    return this;
  }
});