Shelvesy.Collections.Books = Backbone.Collection.extend({
  model: Shelvesy.Models.Book,
  url: 'api/books',
  
  initialize: function(models, options) {
    if (options && options.shelf) {
      this.shelf = options.shelf;
    }
  },
  
  getOrFetch: function(id) {
    var book = this.get(id);

    if(!book) {
      book = new Shelvesy.Models.Book({ id: id });
      book.fetch({
        success: function() {
          this.add(book);
        }.bind(this)
      });
    } else {
      book.fetch();
    }

    return book;
  }
});

Shelvesy.Collections.books = new Shelvesy.Collections.Books();