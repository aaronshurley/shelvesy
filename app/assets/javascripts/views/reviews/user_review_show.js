Shelvesy.Views.UserReviewShow = Backbone.LinkFormView.extend({
  showTemplate: JST['reviews/review_show'],
  formTemplate: JST['reviews/review_form'],
  className: 'user-review-show',
  
  events: {
    'click button.remove':'removeReview',
    'click button.submit':'create',
    'click a': 'showForm',
    'click button.add': 'showForm',
    'click .close': 'hideForm',
    'keydown textarea': 'maybeCreate'
  },
  
  initialize: function () {
    console.log("UserReviewShow#initialize");
    
    this.listenTo(this.model, 'sync change:body destroy', this.render);
    this.listenTo(this.collection, '');
  },

  render: function () {
    console.log("UserReviewShow#render");
    var content;
    if (this.formShowing) {
      content = this.formTemplate({
        review: this.model
      });
    } else {
      content = this.showTemplate({
        review: this.model
      });
    }
    this.$el.html(content);
    this.delegateEvents();
    return this;
  },
  
  create: function (event) {
    console.log("UserReviewShow#create");
    event.preventDefault();
    var that = this;
    
    this.model.set({
      body: this.$('textarea').val()
    });
    this.collection.create(this.model, {
      success: that.hideForm()
    });
  },
  
  removeReview: function (event) {
    console.log("UserReviewShow#remove");
    event.preventDefault();
    this.collection.remove(this.model);
    this.model.destroy();
    this.hideForm();
  }
});