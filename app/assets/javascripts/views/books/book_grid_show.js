Shelvesy.Views.BookGridShow = Backbone.CompositeView.extend({
  template: JST['books/grid'],
  className: 'book-grid-container',
  
  initialize: function () {
    this._bookCount = 0;
    console.log("BookGridShow#initialize");
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add remove', this.render);
    // this.listenTo(this.collection, 'add', this.addBook);
    // this.listenTo(this.collection, 'remove', this.removeBook);
    
  },
  
  // addBook: function (book) {
  //   console.log("BookGridShow#addBook");
  //
  //   var itemView = new Shelvesy.Views.BookGridItemShow({
  //     model: book
  //   });
  //
  //   if ((this._bookCount === 0) || (this._bookCount % 4 === 0)) {
  //     this.$('.book-grid').append("<div class='row'></div>");
  //   }
  //   var currentRow = this.$('div.row').last();
  //   this.addSubview(currentRow, itemView);
  //   this._bookCount += 1;
  // },
  //
  // removeBook: function (book) {
  //   console.log("BookGridShow#removeBook");
  //   var itemView;
  //   _(this.subviews('.book-grid-item')).each(function (subview) {
  //     debugger;
  //     if(subview.model.id == review.id) {
  //       itemView = subview;
  //     }
  //   });
  //
  //   this.removeSubview('.book-grid-item', itemView);
  //   this._bookCount -= 1;
  //   if ((this._bookCount !== 0) && (this._bookCount % 4 === 0)) {
  //     var currentRow = this.$('div.row').last();
  //     currentRow.remove();
  //   }
  // },
  
  render: function () {
    console.log("BookGridShow#render");
    var content = this.template({
      model: this.model
    });
    this.$el.html(content);
    this.renderBooks();
    this.attachSubviews();
    this.onRender(1000);
    return this;
  },
  
  renderBooks: function () {
    console.log("BookGridShow#renderBooks");
    this.emptySubviews('.book-grid');
    debugger;
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
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});