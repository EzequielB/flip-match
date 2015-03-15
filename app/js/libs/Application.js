//'use strict';
define([
    'backbone',
    'backbone.marionette',
    'libs/BounceRegion',
    'libs/CardGridModelFactory',
    'libs/CardGame',
    'views/GameControlsView',
    'views/AboutView',
    'views/NewGameView',
    'views/CloseCurrentGameView',
    'views/GameWonView'
  ],
  function(Backbone, Marionette, BounceRegion, CardGridModelFactory,
    CardGame, GameControlsView, AboutView, NewGameView, CloseCurrentGameView,
    GameWonView) {

    var App = new Backbone.Marionette.Application({
      container: "#appcontainer"
    });

    /* Application regions */
    App.addRegions({
      controlsRegion: '#controlsRegion',
      contentRegion: {
        regionClass: BounceRegion,
        selector: '#contentRegion'
      }
    });

    /* Application initializer */
    App.addInitializer(function() {

      // TODO improve initialization, add a 'Game Flow Controller'?

      var aboutView = new AboutView();
      aboutView.render();

      var newGameView = new NewGameView();
      newGameView.render();

      var closeCurrentGameView = new CloseCurrentGameView();
      closeCurrentGameView.render();

      var gameWonView = new GameWonView();
      gameWonView.render();

      var currentGameView = null;

      var controlsView = new GameControlsView();
      controlsView.on('controls:new', function() {
        if (currentGameView == null) {
          App.contentRegion.transitionToView(newGameView);
        } else {
          App.contentRegion.transitionToView(closeCurrentGameView);
        }
      });

      controlsView.on('controls:about', function() {
        if (App.contentRegion.currentView == aboutView) {
          if (currentGameView) {
            App.contentRegion.transitionToView(currentGameView);
          }
        } else {
          App.contentRegion.transitionToView(aboutView);
        }
      });

      closeCurrentGameView.on('closegame:yes', function() {
        if (currentGameView) {
          currentGameView.destroy();
          currentGameView = null;
        }
        App.contentRegion.transitionToView(newGameView);
      });

      closeCurrentGameView.on('closegame:cancel', function() {
        App.contentRegion.transitionToView(currentGameView);
      });

      newGameView.on('newgame:selected', function(gameType) {
        var gridModel = CardGridModelFactory.build(gameType);
        var game = new CardGame({
          gridModel: gridModel
        });

        currentGameView = game.getGridView();
        game.on('game:won', function() {
          App.contentRegion.transitionToView(gameWonView);
          //currentGameView.destroy();
          currentGameView = null;
        })
        currentGameView.render();
        App.contentRegion.transitionToView(currentGameView);
      });

      App.controlsRegion.show(controlsView);
      App.contentRegion.transitionToView(newGameView);

    });
    // for debugging
    window.app = App;
    return App;
  });
