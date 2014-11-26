Shelvesy.Views.ShelvesIndex = Backbone.View.extend({
  template: JST['shelves/index'],
  
  initialize: function () {
    console.log("ShelvesIndex#initialize");
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function() {
    console.log("ShelvesIndex#render");
    var content = this.template({
      shelves: this.collection
    });
    this.$el.html(content);
    
    return this;
  }
});