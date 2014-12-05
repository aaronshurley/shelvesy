Shelvesy.Views.ReviewListShow = Backbone.CompositeView.extend({
  template: JST['reviews/list'],
  className: 'reviews-list',
  
  initialize: function () {
    console.log("ReviewListShow#init");
    this.listenTo(this.collection, 'sync remove', this.render);
    this.listenTo(this.collection, 'add', this.addReview);
    this.renderReviews();
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
    this.attachSubviews();
    return this;
  },
  
  renderReviews: function() {
    console.log("ReviewListShow#renderReviews");
    this.collection.each(this.addReview.bind(this));
  },
  // TODO: COME BACK HERE
  // removeReview: function() {
//     console.log("ReviewListShow#removeReview");
//     var $target = $(event.currentTarget);
//     var reviewId = $target.find('button.remove').data("review-id");
//     var reviewToRemove = this.collection.get(reviewId);
//
//     debugger
//     var subviews = this.subviews('.review-list-show');
//     var subviewToRemove = _.findWhere(subviews, {model: reviewToRemove});
//     this.removeSubview('.review-list-show', subviewToRemove);
//     reviewToRemove.destroy();
//   }
});