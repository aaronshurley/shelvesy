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
      this._on_shelf = new Shelvesy.Models.Shelf();
    }
    
    return this._on_shelf;
  },
  
  current_user: function() {
    if (!this._current_user) {
      this._current_user = undefined;
    }
    
    return this._current_user;
  },
  
  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews, { parse: true });
      delete response.reviews;
    }
    if (response.current_user) {
      this._current_user = response.current_user;
      delete response.current_user;
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
      success: function (resp) {
        console.log("Book#addToShelf YAY");
        this.set(this.parse(resp));
        successCallback();
      }.bind(this),
      error: function () {
        console.log("Book#addToShelf FAIL");
      }
    });
  },
  
  userReview: function () {
    var reviews = this.reviews();
    
    if (!this.user_review){
      this._user_review = this._current_user && 
        reviews.findWhere({user_id: this._current_user.id});
    }
    
    if (!this._user_review) {
      if (this._current_user) {
        this._user_review = new Shelvesy.Models.Review({
          book_id: this.id
        });
      } else {
        this._user_review = new Shelvesy.Models.Review({
          book_id: this.id
        });
      }
    }
    
    return this._user_review;
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
        this._on_shelf = undefined;
        successCallback();
      }.bind(this),
      error: function () {
        console.log("Book#removeFromShelf FAIL");
      }
    });
  },
  
  descLink: function () {
    var text = this.escape('description').substring(0, 250);
    var linktext = "... <a href='#/books/" + this.id + "'>Read More!</a>";
    return text + linktext;
  }
});