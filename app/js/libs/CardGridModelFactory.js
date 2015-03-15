'use strict';
define([
		'backbone',
		'underscore',
		'models/CardGridModel'
	],
	function(Backbone, _, CardGridModel) {
		// TODO: Improve Grid Factory
		// * Variable size
		// * Built in types (number, letters, images?)
		// * Parameterized types
		var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
		//nums = _.shuffle(nums);
		nums = nums.concat(nums);
		//_.shuffle(nums);

		var n = 6;
		var rowNums = _.groupBy(nums, function(element, index) {
			return Math.floor(index / n);
		});

		var rawRows = [];
		_.each(rowNums, function(row) {
			var rows = [];
			_.each(row, function(num) {
				rows.push({
					info: num
				});
			});
			rawRows.push({
				cards: rows
			});
		});

		var CardGridModelFactory = Backbone.Marionette.Controller.extend({

			initialize: function(options) {},

			build: function() {
				var grid = new CardGridModel({
					rows: rawRows
				});
				return grid;
			}
		});

		return new CardGridModelFactory();
	});
