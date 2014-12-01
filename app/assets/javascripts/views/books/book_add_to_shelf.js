Shelvesy.Views.BookAddToShelf = Backbone.View.extend({
  template: JST['books/add_to_shelf'],
  
  events: {
    'click button.remove': 'removeFromShelf',
    'click button.now': 'addToShelf',
    'click div.add-to li.shelf-select a': 'addToShelf'
  },
  
  initialize: function () {
    this.listenTo(this.collection, 'sync reset remove', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    var shelf = this.model.on_shelf();
    var on_shelf = false;
    if (shelf.attributes.name) {
      on_shelf = true;
    }
    // var to_read = this.collection.findWhere({name: 'To Read'});
    var to_read = '';
    this.collection.each(function(shelf) {
      if (shelf.attributes.name === 'To Read') {
        to_read = shelf;
      }
    });
    
    var content = this.template({
      shelves: this.collection,
      book: this.model,
      shelf: shelf,
      on_shelf: on_shelf,
      to_read: to_read
    });
    
    this.$el.html(content);
    
    return this;
  },
  
  addToShelf: function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    var shelfId = $target.data("shelf-id");
    
    console.log(shelfId);
  },
  
  removeFromShelf: function(event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    var shelfId = $target.data("shelf-id");
    console.log(shelfId);
    var shelf = this.collection.getOrFetch(shelfId);
    var books = shelf.books();
    books.remove(this.model);
    debugger
  }
});