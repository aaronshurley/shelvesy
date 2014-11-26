Shelvesy.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    '': 'index',
    'books/': 'booksIndex',
    'books/:id': 'bookShow'
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
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});