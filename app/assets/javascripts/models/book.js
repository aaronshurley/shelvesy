Shelvesy.Models.Book = Backbone.Model.extend({
  urlRoot: 'api/books',
  
  reviews: function() {
    if(!this._reviews){
      this._reviews = new Shelvesy.Collections.Reviews([], { book: this });
    }
    
    return this._reviews;
  },
  
  parse: function (response) {
    if(response.reviews) {
      this.reviews().set(response.reviews, { parse: true });
      delete response.reviews;
    }

    return response;
  }
});