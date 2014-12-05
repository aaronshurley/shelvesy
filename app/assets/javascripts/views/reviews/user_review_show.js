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
    console.log('cid from UserReviewShow', this.model.cid)
    
    this.listenTo(this.model, 'sync change:body', this.render);
    // this.listenTo(this.model, 'destroy', this.removeView);
    // this.listenTo(this.collection, '');
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
    // this.collection.remove(this.model);
    console.log(this.model.cid);
    var book_id = this.model.get('book_id');
    var user_id = this.model.get('user_id');
    this.model.destroy();
    this.model.clear();
    this.model.set('book_id', book_id);
    this.model.set('user_id', user_id);
    this.formShowing = false;
    this.render();
  },
  
  removeView: function (event) {
    this.remove();
  }
});