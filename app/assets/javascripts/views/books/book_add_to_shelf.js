Shelvesy.Views.BookAddToShelf = Backbone.View.extend({
  template: JST['books/add_to_shelf'],
  
  events: {
    'click button.remove': 'removeFromShelf',
    'click button.now': 'addToShelf',
    'click div.add-to li.shelf-select a': 'addToShelf'
  },
  
  initialize: function () {
    this.listenTo(this.collection, 'add sync reset remove', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    console.log("BookAddToShelf#render");
    debugger
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
    console.log("BookAddToShelf#addToShelf");
    event.preventDefault();
    // var that = this;
    var $target = $(event.currentTarget);
    var shelfId = $target.data("shelf-id");
    console.log(shelfId);
// SCOPE ISSUE!!!
    this.model.addToShelf(shelfId, this.render.bind(this));
    
    return this;
  },
  
  removeFromShelf: function(event) {
    console.log("BookAddToShelf#removeFromShelf");
    event.preventDefault();
    // var that = this;
    var $target = $(event.currentTarget);
    var shelfId = $target.data("shelf-id");
    console.log(shelfId);
// SCOPE ISSUE!!!
    this.model.findThenDelete(shelfId, this.render.bind(this));
    // var shelf = this.collection.getOrFetch(shelfId);
//     var books = shelf.books();
//     books.remove(this.model);

    return this;
  }
});