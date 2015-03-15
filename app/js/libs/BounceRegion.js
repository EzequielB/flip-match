'use strict';
define([
	'backbone'
], function(Backbone) {

	var eventNamesString = [
		'animationend', 'animationend', 'webkitAnimationEnd', 'oanimationend',
		'MSAnimationEnd'
	].join(' ');

	var BounceRegion = Backbone.Marionette.Region.extend({

		attachHtml: function(view) {
			if (view == this.currentView) {
				return;
			}

			var self = this;

			var setNewView = function() {
				view.$el.removeClass("animated bounceOutLeft bounceInRight");
				view.$el.addClass("animated bounceInRight");
				self.$el.html(view.el);
				self.attachView(view);
			};

			if (this.currentView) {
				this.currentView.$el.on(eventNamesString, function() {
					self.currentView.$el.detach();
					$(this).off(eventNamesString);
					setNewView();
				});
				this.currentView.$el.removeClass(
					"animated bounceOutLeft bounceInRight");
				this.currentView.$el.addClass("animated bounceOutLeft");
			} else {
				setNewView();
			}
		},

		transitionToView: function(view) {
			this.attachHtml(view);
		}

	});

	return BounceRegion;

});
