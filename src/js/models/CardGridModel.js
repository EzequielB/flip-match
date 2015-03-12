'use strict';
define([
		'backbone',
		'models/CardRowModel'
	],
	function(Backbone, CardRowModel) {
		var CardRowCollection = Backbone.Collection.extend({
			model: CardRowModel
		});

		var CardGridModel = Backbone.Model.extend({

			initialize: function() {
				var rows = new CardRowCollection(this.get('rows'));
				this.rows = rows;
				this.listenTo(this.rows, 'change:flipped', this.onCardFlipped);
				this.listenTo(this.rows, 'change:matched', this.onCardMatched);
				this.set('matchedCardCount', 0);
			},

			getGridSize: function() {
				var cardsPerRow = this.rows.at(0).get('cards').length;
				return this.rows.length * cardsPerRow;
			},

			onCardFlipped: function(card) {
				if (card.get('flipped') === true) {
					this.trigger('card:flipped', card);
				} else {
					this.trigger('card:unflipped', card);
				}
			},

			onCardMatched: function(card) {
				var matchedCardCount = this.get('matchedCardCount');
				this.set('matchedCardCount', ++matchedCardCount);
				if (matchedCardCount == this.getGridSize()) {
					this.trigger('game:won');
				}
				console.log('matchedCardCount=' + matchedCardCount);
			}

		});

		return CardGridModel;
	});
