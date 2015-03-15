'use strict';
define([
		'backbone',
		'hbs!tmpl/GameControlsViewTmpl'
	],
	function(Backbone, gameControlsViewTmpl) {
		var GameControlsView = Backbone.Marionette.ItemView.extend({

			initialize: function() {},

			events: {
				'click #newGameLink': 'newGameClicked',
				'click #aboutLink': 'aboutClicked'
			},

			template: gameControlsViewTmpl,

			toggleNavBar: function() {
				var collapseButton = this.$el.find('button:not(.collapsed)');
				collapseButton.click();
			},

			newGameClicked: function(event) {
				event.preventDefault();
				this.toggleNavBar();
				this.trigger('controls:new');
			},

			aboutClicked: function(event) {
				event.preventDefault();
				this.toggleNavBar();
				this.trigger('controls:about');
			}

		});

		return GameControlsView;
	});
