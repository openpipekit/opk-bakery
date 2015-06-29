/*global OpkBakery, $*/


window.OpkBakery = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        if (window.location.host === 'localhost:9000') {
            OpkBakery.host = 'http://local.opkp.org'
        }
        else {
            OpkBakery.host = 'http://live-open-pipe-kit-packages.pantheon.io/'
        }
        var recipeBakery = new OpkBakery.Routers.RecipeBakery()
        Backbone.history.start()
    }
};

$(document).ready(function () {
    'use strict';
    OpkBakery.init();
});
