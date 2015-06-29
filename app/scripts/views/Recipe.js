/*global OpkBakery, Backbone, JST*/

OpkBakery.Views = OpkBakery.Views || {};

(function () {
    'use strict';

    OpkBakery.Views.Recipe = Backbone.View.extend({

        template: JST['app/scripts/templates/Recipe.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var vars = this.model.toJSON()
            vars.script = this.generateScript()
            this.$el.html(this.template(vars));
        },

        generateScript: function() {
            var sensorCli = this.model.get('sensorCli')
            var databaseCli = this.model.get('databaseCli')
            var script = '#! /bin/bash \n'
            script += 'watch -n60 "'
            script += sensorCli.generateCommand() 
            script += ' | '
            script += databaseCli.generateCommand()
            return script
        }

    });

})();
