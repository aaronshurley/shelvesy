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
    this.updateStarRating();
    return this;
  },
  
  updateStarRating: function () {
    // BELOW DOESN'T WORK
    this.$('#input-id-' + this.model.id).rating({size: 'xs', showClear: false, showCaption: false, readOnly: true, disabled: true});
    this.$('#input-id-' + this.model.id).rating('update', this.model.escape('rating'));
    // $('div#input-id-2').text("BLAH");
  }
});