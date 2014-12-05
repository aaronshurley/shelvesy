Shelvesy.Views.MainViewShow = Backbone.CompositeView.extend({
  template: JST['main'],
  className: 'main-container',
  
  initialize: function () {
    console.log("MainViewShow#initialize");
    this.listenTo(this.collection, 'sync add remove', this.render);
    this.listenTo(this.collection, 'add', this.addShelf);
    this.listenTo(this.collection, 'remove', this.removeShelf);
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
  
  removeShelf: function (shelf) {
    console.log("MainViewShow#removeShelf");
    var itemView
    _(this.subviews('.shelf-list')).each(function (subview) {
      if(subview.model.id == review.id) {
        itemView = subview;
      }
    });
    
    this.removeSubview('.shelf-list', itemView);
  },
  
  render: function () {
    console.log("MainViewShow#render");
    var content = this.template();
    this.$el.html(content);
    // this.renderShelves();
    this.attachSubviews();

    $("[data-toggle=popover]").popover({ 
      trigger: "manual", 
      html: true,
      container: 'div.well',
      placement: "right auto"
    }).on("mouseenter", function () {
      var _this = this;
      $(this).popover("show");
      $(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
      });
    }).on("mouseleave", function () {
      var _this = this;
      setTimeout(function () {
        if (!$(".popover:hover").length) {
          $(_this).popover("hide");
        }
      }, 300);
    });
    
    setTimeout(function () {
      $('.my-carousel').carousel({
      	interval: false
      });
      $('.my-carousel').on('slid.bs.carousel');
    }, 0);
    
    return this;
  },
  
  renderShelves: function () {
    console.log("MainViewShow#renderBooks");
    this.collection.each(this.addShelf.bind(this));
  }
});