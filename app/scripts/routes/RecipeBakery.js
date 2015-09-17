/*global OpkBakery, Backbone*/

OpkBakery.Routers = OpkBakery.Routers || {};

(function () {
  'use strict';

  OpkBakery.Routers.RecipeBakery = Backbone.Router.extend({

    initialize: function() {
      OpkBakery.recipe = new OpkBakery.Models.Recipe()
    },

    routes: {
      '': 'home',
      'which-sensor': 'whichSensor',
      'configure': 'whichSensor',
      'configure-sensor': 'configureSensor',
      'which-database': 'whichDatabase',
      'configure-database': 'configureDatabase',
      'how-often': 'howOften',
      'choose-network-adapter': 'chooseNetworkAdapter',
      'configure-wifi': 'configureWifi',
      'configure-ethernet-static': 'configureEthernetStatic',
      'recipe': 'recipe',
      'get-the-kit': 'getTheKit',
      'plug-it-in': 'plugItIn'
    },

    home: function() {
      $('.main').fadeOut()
      setTimeout(function() {

        $('body').addClass('plug-it-in')
        $('.main').html('')

        var homeView = new OpkBakery.Views.Home()
        $('.main').append(homeView.el)
        homeView.render()

        $('.main').fadeIn()

        // Bring in the Sensors
        var sensors = new OpkBakery.Collections.Packages()
        sensors.params.packageType = 'sensors'
        var sensorPackagesTable = new OpkBakery.Views.PackageTableSimple({
          collection: sensors
        })
        $('.main').append('<h2 style="font-weight: lighter; text-align: center; padding: 420px 0 30px 0;">Connect your pipe to any of these sensors.</h2>')
        $('.main').append(sensorPackagesTable.el)
        sensors.fetch()

        // Bring in the databases
        var databases = new OpkBakery.Collections.Packages()
        databases.params.packageType = 'databases'
        var databasesPackagesTable = new OpkBakery.Views.PackageTableSimple({
          collection: databases
        })
        $('.main').append('<h2 style="font-weight: lighter; text-align: center; padding: 30px 0 30px 0;">Send your data to any of these places.</h2>')
        $('.main').append(databasesPackagesTable.el)
        databases.fetch()

        $('.main').append('<h2>Are you a developer interested in Open Pipe Kit?')
        $('.main').append('Check out our <a href="http://opk.hackpad.com/Open-Pipe-Kit-Documentation.txt-IUttZt9F0jp">Hackpad Wiki</a> and chime in on our <a href="https://groups.google.com/forum/#!forum/open-pipe-kit">listserv</a>.')

      }, 500)
    },

    getTheKit: function() {
      $('body').removeClass('plug-it-in')
      $('.main').fadeOut()
      setTimeout(function() {
        $('.main').html('')
        var getTheKit = new OpkBakery.Views.GetTheKit()
        $('.main').append(getTheKit.el)
        getTheKit.render()
        $('.main').fadeIn()
      }, 500)
    },

    plugItIn: function() {
      $('body').removeClass('plug-it-in')
      $('.main').fadeOut()
      setTimeout(function() {
        $('.main').html('')
        var plugItIn = new OpkBakery.Views.PlugItIn()
        $('.main').append(plugItIn.el)
        plugItIn.render()
        $('.main').fadeIn()
      }, 500)
    },

    intro: function() {
      $('.main').html()
      var introView = new OpkBakery.Views.Intro()
      $('.main').append(introView.el)
      introView.render()
    },

    whichSensor: function() {
      $('body').removeClass('plug-it-in')
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
        Backbone.history.navigate('choose-network-adapter', {trigger:true})
      })
      form.render()
    },

    chooseNetworkAdapter: function() {
      $('.main').html('<h1>How will you connect to the Internet?</h2>')
      var view = new OpkBakery.Views.ChooseNetworkAdapter()
      view.render()
      var elements = view.$el.find('a')
      var i
      for(i = 0; i < elements.length; i++){
        $(elements[i]).on('click', function(ev) {
          OpkBakery.recipe.set('networkAdapter', this.getAttribute('data-choice'))
        })
      }
      $('.main').append(view.el)
    },

    configureWifi: function() {
      $('.main').html('<h1>Configure WiFi</h1>')
      var wifiOptions = new OpkBakery.Models.WifiOptions()
      var configureWifiForm = new OpkBakery.Views.ConfigureWifi({model: wifiOptions})
      $('.main').append(configureWifiForm.el)
      configureWifiForm.on('configured', function() {
        OpkBakery.recipe.set('wifiName', this.model.get('wifiName'))
        OpkBakery.recipe.set('wifiPassword', this.model.get('wifiPassword'))
        Backbone.history.navigate('recipe', {trigger:true})
      })
      configureWifiForm.render()
    },

    configureEthernetStatic: function() {
      $('.main').html('<h1>Configure your Ethernet with a Static IP Address</h1>')
      var ethernetStaticOptions = new OpkBakery.Models.EthernetStaticOptions()
      var configureEthernetStaticForm = new OpkBakery.Views.ConfigureEthernetStatic({model: ethernetStaticOptions})
      $('.main').append(configureEthernetStaticForm.el)
      configureEthernetStaticForm.on('configured', function() {
        var config = this.model.toJSON()
        delete config.id
        OpkBakery.recipe.set(config)
        Backbone.history.navigate('recipe', {trigger:true})
      })
      configureEthernetStaticForm.render()

    },

    recipe: function() {
      var recipeView = new OpkBakery.Views.Recipe({model: OpkBakery.recipe})
      $('.main').html(recipeView.el)
      recipeView.render()
    }

  });

})();
