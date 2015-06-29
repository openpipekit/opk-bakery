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
            'which-database': 'whichDatabase'
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

    });

})();
