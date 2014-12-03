Shelvesy.Views.MainViewShow = Backbone.CompositeView.extend({
  template: JST['main'],
  className: 'main-container',
  
  initialize: function () {
    console.log("MainViewShow#initialize");
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addShelf);
    this.collection.each(this.addShelf.bind(this));
  },
  
  addShelf: function (shelf) {
    console.log("MainViewShow#addBook");
    var itemView = new Shelvesy.Views.BookGridShow({
      model: shelf,
      collection: shelf.books()
    });
    
    this.addSubview('.shelf-list', itemView);
  },
  
  render: function () {
    console.log("MainViewShow#render");
    var content = this.template();
    this.$el.html(content);
    // this.renderShelves();
    this.attachSubviews();
    return this;
  },
  
  renderShelves: function () {
    console.log("MainViewShow#renderBooks");
    this.collection.each(this.addShelf.bind(this));
  }
});