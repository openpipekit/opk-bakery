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
            this.$el.append(this.generateDownload())
        },

        generateScript: function() {
            var sensorCli = this.model.get('sensorCli')
            var sensorPackage = this.model.get('sensorPackage')
            var databaseCli = this.model.get('databaseCli')
            var databasePackage = this.model.get('databasePackage')
            var script = '#!/bin/bash \n'
            script += 'pirateship wifi ' + this.model.get('wifiName') + ' ' + this.model.get('wifiPassword') + ' \n'
            script += sensorPackage.generateInstall() + ' \n'
            script += databasePackage.generateInstall() + ' \n'
            script += 'touch autorun.sh \n'
            script += 'echo "#!/bin/bash" >> autorun.sh \n'
            script += 'echo \'watch -n' + this.model.get('interval') + ' "'
            script += sensorCli.generateCommand() 
            script += ' | '
            script += databaseCli.generateCommand()
            script += '"\' >> autorun.sh'
            return script
        },

        generateDownload: function() {
          var filename = 'autorunonce.sh'
          var code = $(this.$el.find('textarea')[0]).text()
          var b = document.createElement('a');
          b.download = filename;
          b.textContent = 'download';
          b.href = 'data:application/json;base64,'+ window.btoa(unescape(encodeURIComponent(code)))
          return b
        }

    });

})();
