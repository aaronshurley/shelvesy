Shelvesy.Views.BookGridShow = Backbone.CompositeView.extend({
  template: JST['books/grid'],
  className: 'book-grid-container',
  
  initialize: function () {
    this._bookCount = 0;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.renderBooks);
    this.renderBooks();
  },
  
  render: function () {
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender(1000);
    return this;
  },
  
  renderBooks: function () {
    this.emptySubviews('.book-grid');
    var rowView;
    this.collection.each(function( book, i ) {
      if(i === 0 || i % 4 === 0) {
        if (i === 0) {
          rowView = new Shelvesy.Views.BookGridItemShowSlider({className: 'item active'});
        } else {
          rowView = new Shelvesy.Views.BookGridItemShowSlider();
        }
        this.addSubview('.book-grid', rowView);
      }
      var itemView = new Shelvesy.Views.BookGridItemShow({
        model: book
      });
      rowView.addSubview('.row', itemView);
    }.bind(this));
  }
});

Shelvesy.Views.BookGridItemShowSlider = Backbone.CompositeView.extend({
  template: JST['books/grid_row'],
  className: 'item',
  render: function () {
    var content = this.template();
    this.emptySubviews('.row');
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});