Shelvesy.Views.BookAddToShelf = Backbone.View.extend({
  template: JST['books/add_to_shelf'],
  
  events: {
    'click button.remove': 'removeFromShelf'
  },
  
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    var shelf = this.model.on_shelf();
    var on_shelf = false;
    if (shelf.attributes.name) {
      on_shelf = true;
    }
    var content = this.template({
      shelves: this.collection,
      book: this.model,
      shelf: shelf,
      on_shelf: on_shelf
    });
    
    this.$el.html(content);
    
    return this;
  },
  
  removeFromShelf: function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    console.log($target.data("shelf-id"));
  }
});