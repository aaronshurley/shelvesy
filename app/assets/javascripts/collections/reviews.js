Shelvesy.Collections.Reviews = Backbone.Collection.extend({
  model: Shelvesy.Models.Review,
  urlRoot: 'api/reviews',
  
  initialize: function(models, options) {
    if (options && options.book) {
      this.book = options.book;
    }
  },
  
  getOrFetch: function(id) {
    var review = this.get(id);

    if(!review) {
      review = new Shelvesy.Models.Review({ id: id });
      review.fetch({
        success: function() {
          this.add(review);
        }.bind(this)
      });
    } else {
      review.fetch();
    }

    return review;
  }
});