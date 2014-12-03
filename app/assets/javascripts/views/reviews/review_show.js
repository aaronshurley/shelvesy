Shelvesy.Views.ReviewShow = Backbone.View.extend({
  template: JST['reviews/show'],
  className: 'review-list-item',
  
  initialize: function () {
    console.log("ReviewShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    console.log("ReviewShow#render");
    var content = this.template({
      review: this.model
    });
    this.$el.html(content);
    this.renderStarRating();
    return this;
  },
  
  renderStarRating: function () {
    this.$('#input-id-' + this.model.id).rating({size: 'xs', showClear: false, showCaption: false, readOnly: true, disabled: true});
    this.$('#input-id-' + this.model.id).rating('update', this.model.escape('rating'));
  }
});