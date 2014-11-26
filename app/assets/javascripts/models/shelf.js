Shelvesy.Models.Shelf = Backbone.Model.extend({
  urlRoot: 'api/shelves',
  
  books: function() {
    if(!this._books){
      this._books = new Shelvesy.Collections.Books([], { shelf: this });
    }
    
    return this._books;
  },
  
  parse: function (response) {
    if(response.books) {
      this.books().set(response.books, { parse: true });
      delete response.books;
    }

    return response;
  }
});