Shelvesy.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  // review these routes, maybe the below shouldn't have direct paths?
  routes: {
    '': 'index',
    'books/': 'booksIndex',
    'books/:id': 'bookShow',
    'shelves/': 'shelvesIndex',
    'shelves/:id': 'shelfShow'
  },
  
  index: function(){
    console.log("Router#index");
    this.updateNavbar("Home");
    this.$rootEl.empty();
  },
  
  booksIndex: function() {
    console.log("Router#booksIndex");
    
    Shelvesy.Collections.books.fetch();
    
    var indexView = new Shelvesy.Views.BooksIndex({
      collection: Shelvesy.Collections.books
    });
    this.updateNavbar("Books");
    this._swapView(indexView);
  },
  
  bookShow: function(id) {
    console.log("Router#bookShow");
    var book = Shelvesy.Collections.books.getOrFetch(id);
    var showView = new Shelvesy.Views.BookShow({
      model: book
    });
    this.updateNavbar("Books");
    this._swapView(showView);
  },
  
  shelvesIndex: function() {
    console.log("Router#shelvesIndex");
    Shelvesy.Collections.shelves.fetch();
    
    var indexView = new Shelvesy.Views.ShelvesIndex({
      collection: Shelvesy.Collections.shelves
    });
    this.updateNavbar("Shelves");
    this._swapView(indexView);
  },
  
  shelfShow: function(id) {
    console.log("Router#shelfShow");
    Shelvesy.Collections.shelves.fetch();
    var shelf = Shelvesy.Collections.shelves.getOrFetch(id);
    var showView = new Shelvesy.Views.ShelfShow({
      model: shelf
    });
    this.updateNavbar("Shelves");
    this._swapView(showView);
  },
  
  updateNavbar: function(page) {
    console.log("Router#updateNavbar");
    var selector = 'ul#nav-main li' + ':contains("' + page + '")';
    $('ul#nav-main li').removeClass("active");
    $(selector).addClass("active");
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});