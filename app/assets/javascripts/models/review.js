Shelvesy.Models.Review = Backbone.Model.extend({
  urlRoot: 'api/reviews',
  
  user: function() {
    if (!this._user) {
      this._user = {id: this.attributes.user_id};
    }
    
    return this._user;
  },
  
  book: function() {
    if (!this._book) {
      this._book = new Shelvesy.Models.Book();
    }
    
    return this._book;
  },
  
  review_date: function() {
    var date = new Date(this.attributes.updated_at);
    return date.toLocaleDateString();
  },

  parse: function (response) {
    if (response.user) {
      console.log("PARSED USER");
      this._user = response.user;
      delete response.user;
    }
    if (response.book) {
      console.log("PARSED BOOK");
      this.book().set(response.book);
      delete response.book;
    }
    return response;
  }
});