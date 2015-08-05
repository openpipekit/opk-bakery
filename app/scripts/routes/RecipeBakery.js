/*global OpkBakery, Backbone*/

OpkBakery.Routers = OpkBakery.Routers || {};

(function () {
  'use strict';

  OpkBakery.Routers.RecipeBakery = Backbone.Router.extend({

    initialize: function() {
      OpkBakery.recipe = new OpkBakery.Models.Recipe()
    },

    routes: {
      '': 'intro',
      'which-sensor': 'whichSensor',
      'configure-sensor': 'configureSensor',
      'which-database': 'whichDatabase',
      'configure-database': 'configureDatabase',
      'how-often': 'howOften',
      '
      'recipe': 'recipe',
    },

    intro: function() {
      $('.main').html()
      var introView = new OpkBakery.Views.Intro()
      $('.main').append(introView.el)
      introView.render()
    },
    
    whichSensor: function() {
      $('.main').html('<h1>Which sensor?</h1>')
      var sensors = new OpkBakery.Collections.Packages()
      sensors.params.packageType = 'sensors'
      var packagesTable = new OpkBakery.Views.PackagesTable({
        collection: sensors
      })
      $('.main').append(packagesTable.el)
        packagesTable.$el.on('select', function() {
          var selected = (packagesTable.$el.find('.selected'))[0]  
          var sensorId = $(selected).attr('data-id')
          sensors.models.forEach(function(model) {
            if (model.id == sensorId) {
                OpkBakery.recipe.set('sensorPackage', model)
            }
          })
          Backbone.history.navigate('configure-sensor', {trigger:true})
        })
      sensors.fetch()
    },
    
    configureSensor: function() {
      $('.main').html('<h1>Configure your sensor</h1>')
      var sensor = new OpkBakery.Models.Package({nid: (OpkBakery.recipe.get('sensorPackage')).id})
      var form = new OpkBakery.Views.ConfigurePackage({model: sensor})
      $('.main').append(form.el)
      sensor.fetch()
      form.on('configured', function() {
        console.log('ok')
        OpkBakery.recipe.set('sensorCli', this.cli)
        Backbone.history.navigate('which-database', {trigger:true})
      })
    },

    whichDatabase: function() {
      $('.main').html('<h1>Which database?</h1>')
      var databases = new OpkBakery.Collections.Packages()
      databases.params.packageType = 'databases'
      var packagesTable = new OpkBakery.Views.PackagesTable({
        collection: databases
      })
      $('.main').append(packagesTable.el)
      packagesTable.$el.on('select', function() {
        var selected = (packagesTable.$el.find('.selected'))[0]
        var databaseId = $(selected).attr('data-id')
        databases.models.forEach(function(model) {
          if (model.id == databaseId) {
            OpkBakery.recipe.set('databasePackage', model)
          }
        })
        Backbone.history.navigate('configure-database', {trigger:true})
      })
      databases.fetch()
    },

    configureDatabase: function() {
      $('.main').html('<h1>Configure your database</h1>')
      var database = new OpkBakery.Models.Package({nid: (OpkBakery.recipe.get('databasePackage')).id})
      var form = new OpkBakery.Views.ConfigurePackage({model: database})
      $('.main').append(form.el)
      database.fetch()
      form.on('configured', function() {
        console.log('ok')
        OpkBakery.recipe.set('databaseCli', this.cli)
        // @todo Route to how-often
        Backbone.history.navigate('how-often', {trigger:true})
      })
    },

    howOften: function() {
      $('.main').html('<h1>How often?</h1>')
      var watch = new OpkBakery.Models.Watch()
      var form = new OpkBakery.Views.HowOften({model: watch})
      $('.main').append(form.el)
      form.on('submit', function() {
        OpkBakery.recipe.set('interval', watch.get('interval'))
        Backbone.history.navigate('recipe', {trigger:true})
      })
      form.render()
    },

    recipe: function() {
      var recipeView = new OpkBakery.Views.Recipe({model: OpkBakery.recipe})
      $('.main').html(recipeView.el)
      recipeView.render()
    }

  });

})();
