'use strict';
define([
		'backbone',
		'hbs!tmpl/GameWonViewTmpl'
	],
	function(Backbone, gameWonViewTmpl) {
		var GameWonView = Backbone.Marionette.ItemView.extend({

			initialize: function() {},

			events: {},

			template: gameWonViewTmpl,

			className: 'container game-grid-container'

		});

		return GameWonView;
	});
