Shelvesy.Views.BookSearch = Backbone.View.extend({
  template: JST['books/search'],
  
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function() {
    var content = this.template();
    this.$el.html(content);
    
    return this;
  }
});