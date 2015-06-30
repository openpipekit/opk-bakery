/*global OpkBakery, Backbone, JST*/

OpkBakery.Views = OpkBakery.Views || {};

(function () {
    'use strict';

    OpkBakery.Views.PackagesTable = Backbone.View.extend({

        itemView: 'PackageRow',

        template: JST['app/scripts/templates/SensorsTable.ejs'],

        tagName: 'table',

        id: '',

        className: 'table',

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'sync', this.render);
        },

        render: function () {
            this.collection.models.forEach(function(model) {
                var itemView = new OpkBakery.Views[this.itemView]({ model: model})
                this.$el.append(itemView.el)
                itemView.render()
            }, this)
        }

    });

})();
