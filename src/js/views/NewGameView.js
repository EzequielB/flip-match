'use strict';
define([
		'backbone',
		'hbs!tmpl/NewGameViewTmpl'
	],
	function(Backbone, newGameViewTmpl) {
		var NewGameView = Backbone.Marionette.ItemView.extend({

			initialize: function() {},

			events: {
				'click button': 'selectionClicked'
			},

			template: newGameViewTmpl,

			className: 'container game-grid-container',

			selectionClicked: function(e) {
				this.trigger('newgame:selected', e.target.dataset.gametype);
			}

		});

		return NewGameView;
	});
