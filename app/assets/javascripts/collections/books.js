Shelvesy.Collections.Books = Backbone.Collection.extend({
  model: Shelvesy.Models.Book,
  url: 'api/books',
  
  getOrFetch: function (id) {
    var book = this.get(id);

    if(!book) {
      book = new Shelvesy.Models.Book({ id: id });
      book.fetch({
        success: function () {
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