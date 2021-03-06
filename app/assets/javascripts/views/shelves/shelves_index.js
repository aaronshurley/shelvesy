Shelvesy.Views.ShelvesIndex = Backbone.CompositeView.extend({
  template: JST['shelves/index'],
  
  events: {
    'click a.remove-shelf': 'removeShelf'
  },
  
  initialize: function () {
    this.listenTo(this.collection, 'add remove sync', this.render);
  },
  
  render: function() {
    var content = this.template({
      shelves: this.collection
    });
    this.$el.html(content);
    this.renderFooter();
    return this;
  },

  renderFooter: function () {
    var formView = new Shelvesy.Views.ShelfForm({
      collection: this.collection
    });
    this.addSubview('.shelves-footer', formView);
  },
  
  removeShelf: function (event) {
    event.preventDefault();
    
    var $target = $(event.target);
    
    var $target = $(event.target),
        shelfId = $target.data('shelf-id'),
        shelves = this.collection,
        shelfToRemove = shelves.getOrFetch(shelfId),
        shelfSubviews = this.subviews('.shelves-list');
    shelfToRemove.destroy();
    shelves.remove(shelfToRemove);
    var subviewToRemove = _.findWhere(shelfSubviews, {model: shelfToRemove});
    shelfSubviews.splice(shelfSubviews.indexOf(shelfToRemove), 1);
  }
});