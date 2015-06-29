/*global OpkBakery, Backbone*/

OpkBakery.Routers = OpkBakery.Routers || {};

(function () {
    'use strict';

    OpkBakery.Routers.RecipeBakery = Backbone.Router.extend({
        initialize: function() {
            OpkBakery.recipe = new OpkBakery.Models.Recipe()
        },
    	routes: {
    		'': 'whichSensor',
            'configure-sensor': 'configureSensor',
            'which-database': 'whichDatabase',
            'configure-database': 'configureDatabase',
            'recipe': 'recipe',
    	},
    	whichSensor: function() {
    		var sensors = new OpkBakery.Collections.Packages()
            sensors.params.packageType = 'sensors'
    		var packagesTable = new OpkBakery.Views.PackagesTable({
    			collection: sensors
    		})
    		$('.main').html(packagesTable.el)
            packagesTable.$el.on('select', function() {
                var selected = (packagesTable.$el.find('.selected'))[0]
                OpkBakery.recipe.set('sensorId', $(selected).attr('data-id'))
                Backbone.history.navigate('configure-sensor', {trigger:true})
            })
    		sensors.fetch()
    	},
        configureSensor: function() {
          var sensor = new OpkBakery.Models.Package({nid: OpkBakery.recipe.get('sensorId')})
          var form = new OpkBakery.Views.ConfigurePackage({model: sensor})
          $('.main').html(form.el)
          sensor.fetch()
          form.on('configured', function() {
            console.log('ok')
            OpkBakery.recipe.set('sensorCli', this.cli)
            Backbone.history.navigate('which-database', {trigger:true})
          })
        },
        whichDatabase: function() {
            var database = new OpkBakery.Collections.Packages()
            database.params.packageType = 'databases'
            var packagesTable = new OpkBakery.Views.PackagesTable({
                collection: database
            })
            $('.main').html(packagesTable.el)
            packagesTable.$el.on('select', function() {
                var selected = (packagesTable.$el.find('.selected'))[0]
                OpkBakery.recipe.set('databaseId', $(selected).attr('data-id'))
                Backbone.history.navigate('configure-database', {trigger:true})
            })
            database.fetch()
        },
        configureDatabase: function() {
          var database = new OpkBakery.Models.Package({nid: OpkBakery.recipe.get('databaseId')})
          var form = new OpkBakery.Views.ConfigurePackage({model: database})
          $('.main').html(form.el)
          database.fetch()
          form.on('configured', function() {
            console.log('ok')
            OpkBakery.recipe.set('databaseCli', this.cli)
            // @todo Route to how-often
            Backbone.history.navigate('recipe', {trigger:true})
          })
        },
        recipe: function() {
            var recipeView = new OpkBakery.Views.Recipe({model: OpkBakery.recipe})
            $('.main').html(recipeView.el)
            recipeView.render()
        }

    });

})();
