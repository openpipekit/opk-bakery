/*global OpkBakery, Backbone, JST*/

OpkBakery.Views = OpkBakery.Views || {};

(function () {
    'use strict';

    OpkBakery.Views.HowOften = Backbone.View.extend({

        template: JST['app/scripts/templates/HowOften.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {                
            var view = this
            var form = new Backbone.Form({
                model: this.model,
                submitButton: 'submit'
            }).render();
            this.$el.html(form.el);
            this.$el.append('<button class="btn">submit</button>')
            $(this.$el.find('button')[0]).on('click', function() {
                console.log('submitted')
                form.commit()
                view.trigger('submit')
            })
        }

    });

})();
