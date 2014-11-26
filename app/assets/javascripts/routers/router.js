Shelvesy.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    '': 'index',
    'books/': 'booksIndex',
    'books/:id': 'bookShow',
    'shelves/': 'shelvesIndex',
    'shelves/:id': 'shelfShow'
  },
  
  index: function(){
    console.log("Router#index");
  },
  
  booksIndex: function() {
    console.log("Router#booksIndex");
    
    Shelvesy.Collections.books.fetch();
    
    var indexView = new Shelvesy.Views.BooksIndex({
      collection: Shelvesy.Collections.books
    });
    
    this._swapView(indexView);
  },
  
  bookShow: function(id) {
    console.log("Router#bookShow");
    var book = Shelvesy.Collections.books.getOrFetch(id);
    var showView = new Shelvesy.Views.BookShow({
      model: book
    });
    
    this._swapView(showView);
  },
  
  shelvesIndex: function() {
    console.log("Router#shelvesIndex");
    Shelvesy.Collections.shelves.fetch();
    
    var indexView = new Shelvesy.Views.ShelvesIndex({
      collection: Shelvesy.Collections.shelves
    });
    
    this._swapView(indexView);
  },
  
  shelfShow: function(id) {
    console.log("Router#shelfShow");
    var shelf = new Shelvesy.Collections.shelves.getOrFetch(id);
    var showView = new Shelvesy.Views.ShelfShow({
      model: shelf
    });
    
    this._swapView(showView);
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});