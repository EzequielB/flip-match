'use strict';
define([
		'backbone',
		'underscore',
		'views/CardGridView'
	],
	function(Backbone, _, CardGridView) {
		// TODO: improve encapsulation? use partial with a default private context?
		var CardGame = Backbone.Marionette.Controller.extend({

			conf: {
				CARD_VISIBLE_MILLIS: 5000,
				CARD_VANISH_ANIMATION_MILLIS: 2000,
				CARD_VANISH_ANIMATION_DELAY_MILLIS: 500
			},

			initialize: function(options) {
				_.extend(this.conf, options.conf || {});
				this.temporizedCount = 0;
				this.cardQueue = [];

				var gridModel = options.gridModel;
				gridModel.on('card:flipped', function(card) {
					this.flipCard(card);
				}, this);
				gridModel.on('game:won', function() {
					var func = _.bind(function() {
						this.trigger('game:won');
					}, this);
					_.delay(func, this.conf.CARD_VANISH_ANIMATION_MILLIS);
				}, this);

				this.gridView = new CardGridView({
					model: gridModel,
					conf: this.conf
				});
			},

			getGridView: function() {
				return this.gridView;
			},

			temporizeUnflip: function(card) {
				this.temporizedCount++;
				var func = _.bind(this.unflipCard, this);
				_.delay(func, this.conf.CARD_VISIBLE_MILLIS, card, this.temporizedCount);
				this.cardQueue.push({
					card: card,
					temporizeNum: this.temporizedCount
				});
			},

			unflipCard: function(card, temporizeNum) {
				var e = _.findWhere(this.cardQueue, {
					temporizeNum: temporizeNum
				});
				if (e) {
					e.card.unflip();
					this.cardQueue = _.without(this.cardQueue, e);
				}
			},

			unflipQueuedCards: function() {
				_.each(this.cardQueue, function(e) {
					e.card.unflip();
				});
				this.cardQueue = [];
			},

			flipCard: function(card) {
				if (this.cardQueue.length == 2) {
					this.unflipQueuedCards();
				}

				if (this.cardQueue.length == 1) {
					var previousFlippedCard = this.cardQueue[0].card;
					if (previousFlippedCard.isMatch(card)) {
						previousFlippedCard.matched();
						card.matched();
						this.cardQueue = [];
						return;
					}
				}

				this.temporizeUnflip(card);
			},

		});

		return CardGame;

	});
