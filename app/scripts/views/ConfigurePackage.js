/*global OpkBakery, Backbone, JST*/

OpkBakery.Views = OpkBakery.Views || {};

(function () {
    'use strict';

    OpkBakery.Views.ConfigurePackage = Backbone.View.extend({

        template: JST['app/scripts/templates/ConfigurePackage.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'sync', this.render);
        },

        render: function () {
            // @todo We might want there to be more than one command
            var view = this
            var cli = this.model.commands[0]
            this.cli = cli
            if (Object.keys(cli.schema).length == 0) {
                view.trigger('configured')
            }
            else {
                var form = new Backbone.Form({
                    model: cli,
                    submitButton: 'submit'
                }).render();
                this.$el.html(form.el);
                this.$el.append('<button class="btn">submit</button>')
                $(this.$el.find('button')[0]).on('click', function() {
                    console.log('submitted')
                    form.commit()
                    view.trigger('configured')
                })
            }
        }

    });

})();
