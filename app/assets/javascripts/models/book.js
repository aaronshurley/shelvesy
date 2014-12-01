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
        console.log("YAY");
      }
    });
  }
});