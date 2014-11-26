Shelvesy.Views.ShelfShow = Backbone.CompositeView.extend({
  template: JST['shelves/show'],
  
  initialize: function () {
    console.log("ShelfShow#init");
    this.listenTo(this.model, 'sync', this.render);
  },
  
  render: function() {
    console.log("ShelfShow#render");
    console.log(this.model.escape('name'));
    var content = this.template({
      shelf: this.model
    });
    this.$el.html(content);
    
    return this;
  },
  
  addBook: function(book) {
    
  },
  
  
});