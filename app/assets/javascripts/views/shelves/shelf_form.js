Shelvesy.Views.ShelfForm = Backbone.LinkFormView.extend({
  formTemplate: JST['shelves/form'],
  linkTemplate: JST['shelves/form_link'],

  create: function (event) {
    event.preventDefault();
        
    this.collection.create({
      name: this.$('textarea').val()
    }, { wait: true });

    this.$('textarea').val('');
    this.$('textarea').focus();
  },

  render: function () {
    var content;
    if(this.formShowing) {
      content = this.formTemplate();
    } else {
      content = this.linkTemplate();
    }

    this.$el.html(content);
    this.delegateEvents();
    return this;
  }
});
