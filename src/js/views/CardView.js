'use strict';
define([
    'jquery',
    'backbone',
    'hbs!tmpl/CardViewTmpl'
  ],
  function($, Backbone, cardViewTmpl) {

    var animationDurationProperties = [
      '-webkit-animation-duration',
      '-moz-animation-duration',
      '-ms-animation-duration',
      '-o-animation-duration',
      'animation-duration'
    ];

    var animationEndedEventNames = [
      'animationend', 'animationend', 'webkitAnimationEnd', 'oanimationend',
      'MSAnimationEnd'
    ];

    var eventNamesString = animationEndedEventNames.join(' ');

    var CardView = Backbone.Marionette.CompositeView.extend({

      initialize: function() {
        this.listenTo(this.model, "change:flipped", this.cardFlipped);
        this.listenTo(this.model, "change:matched", this.cardMatched);
        this.conf = this.options.conf;
      },

      events: {
        'click .card': 'cardClicked'
      },

      ui: {
        card: ".card"

      },

      template: cardViewTmpl,

      className: 'col-xs-2 col-md-2',

      // TODO decouple into a new library (ripple lib) and set up at start up
      doRippleEffect: function(event) {
        event.preventDefault();

        var $div = $('<div/>'),
          btnOffset = this.$el.offset(),
          xPos = event.pageX - btnOffset.left,
          yPos = event.pageY - btnOffset.top;



        $div.addClass('ripple-effect');
        var $ripple = $(".ripple-effect");

        $ripple.css("height", this.$el.height());
        $ripple.css("width", this.$el.height());
        $div
          .css({
            top: yPos - ($ripple.height() / 2),
            left: xPos - ($ripple.width() / 2),
            background: this.$el.data("ripple-color")
          })
          .appendTo(this.$el.find('section'));

        window.setTimeout(function() {
          $div.remove();
        }, 2000);
      },

      cardClicked: function(event) {
        this.doRippleEffect(event);
        this.model.flip();
      },

      cardFlipped: function() {
        if (this.model.get('flipped') === true) {
          this.ui.card[0].classList.add('flipped');
        } else {
          this.ui.card[0].classList.remove('flipped');
        }
      },

      cardMatched: function() {
        // TODO improve code
        if (this.model.get('matched')) {
          var cardEl = this.ui.card[0];
          var showAnimation = _.bind(function() {
            var listener = function() {
              cardEl.parentNode.style['visibility'] = 'hidden';
              cardEl.parentNode.classList.remove('animated',
                'zoomOut');
              _.each(animationEndedEventNames, function(eventName) {
                cardEl.parentNode.removeEventListener(
                  eventName, listener);
              });
            };
            $(cardEl.parentNode).on(eventNamesString, function() {
              listener();
              $(this).off(eventNamesString);
            });

            _.each(animationDurationProperties, function(property) {
              cardEl.parentNode.style[property] = this.conf.CARD_VANISH_ANIMATION_MILLIS +
                'ms';
            }, this);
            cardEl.parentNode.classList.add('animated', 'zoomOut');
          }, this);
          _.delay(showAnimation, this.conf.CARD_VANISH_ANIMATION_DELAY_MILLIS);
        }
      }

    });

    return CardView;
  });
