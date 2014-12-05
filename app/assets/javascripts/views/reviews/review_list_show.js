Shelvesy.Views.ReviewListShow = Backbone.CompositeView.extend({
  template: JST['reviews/list'],
  className: 'reviews-list',
  
  initialize: function () {
    console.log("ReviewListShow#init");
    this.listenTo(this.collection, 'sync remove', this.render);
    this.listenTo(this.collection, 'add', this.addReview);
    this.listenTo(this.collection, 'remove', this.removeReview);
    this.renderReviews();
  },
  
  addReview: function (review) {
    console.log("ReviewListShow#addReview");
    // debugger;
    var itemView = new Shelvesy.Views.ReviewShow({
      model: review
    });
    
    this.addSubview('.review-list-show', itemView);
  },
  
  removeReview: function (review) {
    console.log("ReviewListShow#addReview");
    var itemView
    _(this.subviews('.review-list-show')).each(function (subview) {
      if(subview.model.id == review.id) {
        itemView = subview;
      }
    });
    
    this.removeSubview('.review-list-show', itemView);
  },
  
  render: function() {
    console.log("ReviewListShow#render");
    var content = this.template({
      reviews: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  
  renderReviews: function() {
    console.log("ReviewListShow#renderReviews");
    this.collection.each(this.addReview.bind(this));
  }
});