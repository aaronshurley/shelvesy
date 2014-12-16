Shelvesy.Views.ReviewListShow = Backbone.CompositeView.extend({
  template: JST['reviews/list'],
  className: 'reviews-list',
  
  initialize: function () {
    this.listenTo(this.collection, 'sync remove', this.render);
    this.listenTo(this.collection, 'add', this.addReview);
    this.listenTo(this.collection, 'remove', this.removeReview);
    this.renderReviews();
  },
  
  addReview: function (review) {
    var itemView = new Shelvesy.Views.ReviewShow({
      model: review
    });
    
    this.addSubview('.review-list-show', itemView);
  },
  
  removeReview: function (review) {
    var itemView
    _(this.subviews('.review-list-show')).each(function (subview) {
      if(subview.model.id == review.id) {
        itemView = subview;
      }
    });
    
    this.removeSubview('.review-list-show', itemView);
  },
  
  render: function() {
    var content = this.template({
      reviews: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
  
  renderReviews: function() {
    this.collection.each(this.addReview.bind(this));
  }
});