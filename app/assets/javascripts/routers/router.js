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
    this.updateNavbar("Home");
    Shelvesy.Collections.shelves.fetch();

    var mainView = new Shelvesy.Views.MainViewShow({
      collection: Shelvesy.Collections.shelves
    });
    this._swapView(mainView);
  },
  
  booksIndex: function() {
    var allBooks = new Shelvesy.Collections.Books();
    allBooks.fetch();
    
    var indexView = new Shelvesy.Views.BooksIndex({
      collection: allBooks
    });
    this.updateNavbar("Books");
    this._swapView(indexView);
  },
  
  shelvedBookIndex: function() {
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