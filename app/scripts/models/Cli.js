/*global OpkBakery, Backbone*/

OpkBakery.Models = OpkBakery.Models || {};

(function () {
    'use strict';

    OpkBakery.Models.Cli = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
