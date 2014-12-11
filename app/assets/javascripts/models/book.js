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
    if (response.current_user) {
      this._current_user = response.current_user;
      delete response.current_user;
    }
    
    if (response.reviews) {
      _(response.reviews).each(function (rev) {
        rev.book_id = response.id;
        var review = new Shelvesy.Models.Review(rev, { parse: true });
        this.reviews().add(review);
        if(this._current_user && this._current_user.id === rev.user_id) {
          this._user_review = review;
        }
      }.bind(this));
      
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
      success: function (resp) {
        this.set(this.parse(resp));
        successCallback();
      }.bind(this)
    });
  },
  
  userReview: function () {
    if (!this._user_review) {
      this._user_review = new Shelvesy.Models.Review({
        book_id: this.id
      });
    }
    
    if (this._current_user) {
      if (!this._user_review.attributes.user_id) {
        this._user_review.set('user_id', this._current_user.id);
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
        var shelvedBookId = data[0].id;
        that.removeFromShelf(shelvedBookId, successCallback);
      }
    });
  },
  
  removeFromShelf: function (shelvedBookId, successCallback) {
    $.ajax({
      type: 'DELETE',
      url: '/api/shelved_books/' + shelvedBookId,
      success: function () {
        this._on_shelf = undefined;
        successCallback();
      }.bind(this)
    });
  },
  
  descLink: function () {
    var text = this.escape('description').substring(0, 250);
    var linktext = "... <a href='#/books/" + this.id + "'>Read More!</a>";
    return text + linktext;
  }
});