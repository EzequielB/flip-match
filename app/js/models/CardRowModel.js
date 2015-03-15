'use strict';
define([
		'backbone',
		'models/CardModel'
	],
	function(Backbone, CardModel) {
		var CardCollection = Backbone.Collection.extend({
			model: CardModel,
		});

		var CardRowModel = Backbone.Model.extend({

			initialize: function() {
				var cards = new CardCollection(this.get('cards'));
				this.cards = cards;
				this.listenTo(this.cards, 'change:flipped', this.onCardFlipped);
				this.listenTo(this.cards, 'change:matched', this.onCardMatched);
			},

			onCardFlipped: function(card) {
				this.trigger('change:flipped', card);
			},

			onCardMatched: function(card) {
				this.trigger('change:matched', card);
			}

		});

		return CardRowModel;
	});
