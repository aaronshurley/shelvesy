Shelvesy.Views.UserReviewShow = Backbone.View.extend({
  template: JST['reviews/user_show'],
  className: 'user-review-show',
  
  initialize: function () {
    console.log("UserReviewShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    console.log("UserReviewShow#render");
    var content = this.template({
      review: this.model
    });
    this.$el.html(content);
    // this.updateStarRating();
    return this;
  }
  
  // updateStarRating: function () {
//     this.$('#input-id-' + this.model.id).rating({size: 'xs', showClear: false, showCaption: false, readOnly: true, disabled: true});
//     this.$('#input-id-' + this.model.id).rating('update', this.model.escape('rating'));
//   }
});