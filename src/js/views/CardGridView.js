'use strict';
define([
    'backbone',
    'views/CardRowView'
  ],
  function(Backbone, CardRowView) {
    var CardGridView = Backbone.Marionette.CollectionView.extend({

      childView: CardRowView,

      tagName: 'div',

      className: 'container game-grid-container',

      initialize: function() {
        this.collection = this.model.rows;
      },

      childViewOptions: function() {
        return {
          conf: this.options.conf
        };
      }

    });

    return CardGridView;
  });
