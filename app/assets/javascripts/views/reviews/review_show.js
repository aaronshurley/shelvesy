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
    
    return this;
  }
});