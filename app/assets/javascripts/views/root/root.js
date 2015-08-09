GeoFlickr.Views.Root = Backbone.View.extend({
    el: 'body',

    events: {
        'click #sign-up': 'openSignUpModal'
    },

    template: '<div class="container-fluid></div>',

    openSignUpModal: function() {
        // var view = new ModalView();
        var modal = new Backbone.BootstrapModal({
            content: "I'm a modal!",
            title: 'modal header',
            animate: true
        }).open(function(){ console.log('clicked OK') });
    },

    render: function() {
        this.$el.html(this.template);
        console.log('main rendered');
        return this;
    }
});
