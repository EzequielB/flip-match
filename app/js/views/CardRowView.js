'use strict';
define([
		'backbone',
		'views/CardView'
	],
	function(Backbone, CardView) {
		var CardRowView = Backbone.Marionette.CollectionView.extend({

			initialize: function() {
				this.collection = this.model.cards;
			},

			childView: CardView,

			tagName: 'div',

			className: 'row show-grid row-no-padding',

			childViewOptions: function() {
				return {
					conf: this.options.conf
				};
			}

		});

		return CardRowView;
	});
