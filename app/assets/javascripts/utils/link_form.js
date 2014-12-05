Backbone.LinkFormView = Backbone.View.extend({
  formShowing: false,

  events: {
    'click a': 'showForm',
    'click .close': 'hideForm',
    'submit' : 'create',
    'keydown textarea': 'maybeCreate'
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
  },

  hideForm: function () {
    console.log("link_form#hideForm");
    this.formShowing = false;
    this.render();
  },

  maybeCreate: function (event) {
    if(event.keyCode === 13) {
      this.create(event);
    }
  },

  showForm: function (event) {
    console.log("link_form#showForm");
    event.preventDefault();
    this.formShowing = true;
    this.render();
  }
});
