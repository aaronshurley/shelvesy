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
    $('.test-only').rating({size: 'xs', showClear: false, showCaption: false, readOnly: true, disabled: true});
    $('.test-only').rating('update', 4);
    // BELOW DOESN'T WORK
    // $('div#input-id-2').text("BLAH");
  }
});