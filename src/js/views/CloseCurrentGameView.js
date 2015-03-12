'use strict';
define([
		'backbone',
		'hbs!tmpl/CloseCurrentGameViewTmpl'
	],
	function(Backbone, closeCurrentGameViewTmpl) {
		var CloseCurrentGameView = Backbone.Marionette.ItemView.extend({

			initialize: function() {},

			events: {
				'click #yesBtn': 'yesClicked',
				'click #cancelBtn': 'cancelClicked'
			},

			template: closeCurrentGameViewTmpl,

			className: 'container game-grid-container',

			yesClicked: function() {
				this.trigger('closegame:yes');
			},

			cancelClicked: function() {
				this.trigger('closegame:cancel');
			}

		});

		return CloseCurrentGameView;
	});
