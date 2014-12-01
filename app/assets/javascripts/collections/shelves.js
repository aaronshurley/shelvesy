Shelvesy.Collections.Shelves = Backbone.Collection.extend({
  model: Shelvesy.Models.Shelf,
  url: 'api/shelves',
  
  initialize: function(models, options){
    if (options && options.user_id) {
      this.user_id = options.user_id;
    }
  },
  
  getOrFetch: function(id) {
    var shelf = this.get(id);

    if(!shelf) {
      shelf = new Shelvesy.Models.Shelf({ id: id });
      shelf.fetch({
        success: function () {
          this.add(shelf);
        }.bind(this)
      });
    } else {
      shelf.fetch();
    }

    return shelf;
  }
});

Shelvesy.Collections.shelves = new Shelvesy.Collections.Shelves();