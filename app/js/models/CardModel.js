'use strict';
define([
		'backbone'
	],
	function(Backbone) {
		var CardModel = Backbone.Model.extend({

			initialize: function() {
				this.set('flipped', false);
				this.set('matched', false);
			},

			flip: function() {
				this.set('flipped', true);
			},

			unflip: function() {
				this.set('flipped', false);
			},

			matched: function() {
				this.set('matched', true);
			},

			isMatch: function(otherCard) {
				return this.get('info') == otherCard.get('info');
			}

		});

		return CardModel;
	});
