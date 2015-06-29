/*global OpkBakery, $*/


window.OpkBakery = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        OpkBakery.host = 'http://local.opkp.org'
        var recipeBakery = new OpkBakery.Routers.RecipeBakery()
        Backbone.history.start()
    }
};

$(document).ready(function () {
    'use strict';
    OpkBakery.init();
});
