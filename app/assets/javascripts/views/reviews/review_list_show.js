Shelvesy.Views.ReviewListShow = Backbone.CompositeView.extend({
  template: JST['reviews/list'],
  className: 'reviews-list',
  
  initialize: function () {
    console.log("ReviewListShow#init");
    this.listenTo(this.collection, 'sync remove', this.render);
    this.listenTo(this.collection, 'add', this.addReview);
  },
  
  addReview: function (review) {
    console.log("ReviewListShow#addReview");
  
    var itemView = new Shelvesy.Views.ReviewShow({
      model: review
    });
    
    this.addSubview('.review-list-show', itemView);
  },
  
  render: function() {
    console.log("ReviewListShow#render");
    var content = this.template({
      reviews: this.collection
    });
    this.$el.html(content);
    this.renderReviews();
    return this;
  },
  
  renderReviews: function() {
    console.log("ReviewListShow#renderBookList");
    this.collection.each(this.addReview.bind(this));
  }
  
  // create removeReview function
});