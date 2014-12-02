Shelvesy.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    '': 'index',
    'books/': 'booksIndex',
    'books/:id': 'bookShow',
    'books/shelved/': 'shelvedBookIndex',
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
      collection: Shelvesy.Collections.books,
      heading: 'All Books'
    });
    this.updateNavbar("Books");
    this._swapView(indexView);
  },
  
  shelvedBookIndex: function() {
    console.log("Router#shelvedBookIndex");
    
    var shelvedCollection = new Shelvesy.Collections.Books();
    shelvedCollection.url = 'api/books/shelved';
    shelvedCollection.fetch();
    
    var indexView = new Shelvesy.Views.BooksIndex({
      collection: shelvedCollection
    });
    
    this.updateNavbar("Books");
    this._swapView(indexView);
  },
  
  // bookSearch: function() {
//     console.log("Router#shelvedBookIndex");
//
//     var shelvedCollection = new Shelvesy.Collections.Books();
//     shelvedCollection.url = 'api/books/shelved';
//     shelvedCollection.fetch();
//
//     var indexView = new Shelvesy.Views.BooksIndex({
//       collection: shelvedCollection
//     });
//
//     this.updateNavbar("Books");
//     this._swapView(indexView);
//   },
  
  bookShow: function(id) {
    console.log("Router#bookShow");
    
    // should i fetch global collections everywhere?
    // Shelvesy.Collections.shelves.fetch();
    // Shelvesy.Collections.books.fetch();
    
    var book = new Shelvesy.Models.Book({id: id});
    book.fetch();
    
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
    var selector = 'ul#nav-main > li' + ':contains("' + page + '")';
    $('ul#nav-main > li').removeClass("active");
    $(selector).addClass("active");
  },
  
  _swapView: function(view, callback) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
    if (callback) {
      callback();
    }
  }
});