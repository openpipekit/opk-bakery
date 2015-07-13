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
            var sensorPackage = this.model.get('sensorPackage')
            var databaseCli = this.model.get('databaseCli')
            var databasePackage = this.model.get('databasePackage')
            var script = '#! /bin/bash \n'
            script += sensorPackage.generateInstall() + ' \n'
            script += databasePackage.generateInstall() + ' \n'
            script += 'touch autorun.sh \n'
            script += 'echo "#!/bin/bash" >> autorun.sh \n'
            script += 'echo \'watch -n' + this.model.get('interval') + ' "'
            script += sensorCli.generateCommand() 
            script += ' | '
            script += databaseCli.generateCommand()
            script += '\'" >> autorun.sh'
            return script
        }

    });

})();
