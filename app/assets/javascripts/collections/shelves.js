Shelvesy.Collections.Shelves = Backbone.Collection.extend({
  url: 'api/shelves',
  model: Shelvesy.Models.Shelf,
  
  getOrFetch: function (id) {
    debugger
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