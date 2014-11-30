Shelvesy.Views.BookAddToShelf = Backbone.View.extend({
  template: JST['books/add_to_shelf'],
  
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    var content = this.template({
      shelves: this.collection,
      book: this.model
    });
    this.$el.html(content);
    
    return this;
  }
});