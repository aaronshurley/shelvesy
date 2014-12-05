Shelvesy.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    '': 'index',
    'books/': 'booksIndex',
    'books/:id': 'bookShow',
    'books/add/': 'bookAdd',
    'books/search/(?:queryString)': 'searchBookIndex',
    'books/shelved/': 'shelvedBookIndex',
    'shelves/': 'shelvesIndex',
    'shelves/:id': 'shelfShow',
  },
  
  index: function(){
    console.log("Router#index");
    this.updateNavbar("Home");
    Shelvesy.Collections.shelves.fetch();

    var mainView = new Shelvesy.Views.MainViewShow({
      collection: Shelvesy.Collections.shelves
    });
    this._swapView(mainView);
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
  
  shelvedBookIndex: function() {
    console.log("Router#shelvedBookIndex");
    
    var shelvedCollection = new Shelvesy.Collections.Books();
    shelvedCollection.url = 'api/books/shelved';
    shelvedCollection.fetch();
    
    var indexView = new Shelvesy.Views.BooksIndex({
      collection: shelvedCollection,
    }, {heading: "My Books"});
    
    this.updateNavbar("Books");
    this._swapView(indexView);
  },
  
  searchBookIndex: function(queryString) {
    console.log("Router#searchBookIndex");
    
    var shelvedCollection = new Shelvesy.Collections.Books();
    shelvedCollection.url = 'api/books/search?' + queryString;
    shelvedCollection.fetch();
    
    var indexView = new Shelvesy.Views.BooksIndex({
      collection: shelvedCollection
    });
    
    this.updateNavbar("Books");
    this._swapView(indexView);
  },
  
  bookShow: function(id) {
    console.log("Router#bookShow");
    
    var book = new Shelvesy.Models.Book({id: id});
    book.fetch();
    
    var showView = new Shelvesy.Views.BookShow({
      model: book,
      collection: book.reviews()
    });
    
    this.updateNavbar("Books");
    this._swapView(showView);
  },
  
  bookAdd: function() {
    Shelvesy.Collections.shelves.fetch();
    var searchView = new Shelvesy.Views.BookSearch({
      collection: Shelvesy.Collections.shelves
    });
    this.updateNavbar("Books");
    this._swapView(searchView);
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