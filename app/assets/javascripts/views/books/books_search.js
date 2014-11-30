Shelvesy.Views.BookSearch = Backbone.View.extend({
  template: JST['books/search'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    var content = this.template({
      book: this.model
    });
    this.$el.html(content);
    
    return this;
  }
});