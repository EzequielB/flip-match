'use strict';
define([
    'backbone',
    'hbs!tmpl/AboutViewTmpl'
  ],
  function(Backbone, aboutViewTmpl) {
    var AboutView = Backbone.Marionette.ItemView.extend({

      initialize: function() {},

      events: {},

      template: aboutViewTmpl,

      className: 'container game-grid-container'

    });

    return AboutView;
  });
