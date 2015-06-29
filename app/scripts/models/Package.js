/*global OpkBakery, Backbone*/

OpkBakery.Models = OpkBakery.Models || {};

(function () {
    'use strict';

    OpkBakery.Models.Package = Backbone.Model.extend({

        idAttribute: 'nid',

        url: function() {
            return OpkBakery.host + '/api/package/' + this.id
        },

        defaults: {
        },

        initialize: function() {
            this.commands = []
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            var pkg = this
            pkg.commands = []
            var commands = JSON.parse(response.field_package_json)
            commands.forEach(function(commandObject) {
                var cli = new OpkBakery.Models.Cli()
                cli.set('package', response.field_package_name)
                cli.set('command', commandObject.command)
                cli.schema = commandObject.options 
                pkg.commands.push(cli)
            })

            return response;
        },

        generateInstall: function() {
            var script = 'wget ' + ' --output ' + this.get('field_package_name') + ' ' + this.get('field_package_download_url') +  ' \n'
            script += 'unzip ' + this.get('field_package_name') + ' -d ' + this.get('field_package_name') + ' \n'
            return script
        }

    });

})();
