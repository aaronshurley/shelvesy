Shelvesy.Models.Book = Backbone.Model.extend({
  urlRoot: 'api/books',
  
  reviews: function() {
    if (!this._reviews) {
      this._reviews = new Shelvesy.Collections.Reviews([], { book: this });
    }
    
    return this._reviews;
  },
  
  on_shelf: function() {
    if (!this._on_shelf) {
      this._on_shelf = new Shelvesy.Models.Shelf(this);
    }
    
    return this._on_shelf;
  },
  
  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews, { parse: true });
      delete response.reviews;
    }
    if (response.on_shelf) {
      this.on_shelf().set(response.on_shelf);
      delete response.on_shelf;
    }
    
    return response;
  },
  
  addToShelf: function(shelfId, successCallback) {
    $.ajax({
      type: 'POST',
      url: '/api/shelved_books',
      data: { shelved_book: {
        shelf_id: shelfId,
        book_id: this.id,
        date_added: new Date()
      }},
      success: function () {
        console.log("Book#addToShelf YAY");
        successCallback();
      },
      error: function () {
        console.log("Book#addToShelf FAIL");
      }
    });
  },
  
  findThenDelete: function (shelfId, successCallback) {
    var that = this;
    $.ajax({
      type: 'GET',
      url: '/api/shelved_books/find',
      data: { shelved_book: {
        shelf_id: shelfId,
        book_id: this.id
      }},
      success: function (data) {
        console.log("Book#findThenDelete YAY");
        var shelvedBookId = data[0].id;
        that.removeFromShelf(shelvedBookId, successCallback);
      },
      error: function () {
        console.log("Book#findThenDelete FAIL");
      }
    });
  },
  
  removeFromShelf: function (shelvedBookId, successCallback) {
    $.ajax({
      type: 'DELETE',
      url: '/api/shelved_books/' + shelvedBookId,
      success: function () {
        console.log("Book#removeFromShelf YAY");
        successCallback();
      },
      error: function () {
        console.log("Book#removeFromShelf FAIL");
      }
    });
  }
});