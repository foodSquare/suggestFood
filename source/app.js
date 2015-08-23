// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

app = angular.module('suca', ['ionic', 'ionic-material'])

.run([ '$rootScope', '$window', '$ionicPlatform', function($rootScope, $window, $ionicPlatform) {

	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});

  	$rootScope.user = {};

}])

.config([ '$stateProvider','$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {

	

	$stateProvider
	.state('login', {
	  	url: '/login',
  		templateUrl: 'views/login/login.html',
  		controller: 'LoginCtrl'
	})
	
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'views/menu/menu.html',
		controller: 'MenuCtrl'
	})

	.state('app.search', {
		url: '/search',
		views: {
			//The menuContent works with Ionic widget
			'menuContent': {
				templateUrl: 'views/search/search.html',
				controller: 'SearchCtrl'
		  	}
		}
	})

  	.state('app.photo', {
	  	url: '/photo',
	  	views: {
			'menuContent': {
		  		templateUrl: 'views/photo/photo.html',
		  		controller: 'PhotoCtrl'
			}
	  	}
	})

	.state('app.list', {
	  	url: '/list',
	  	views: {
			'menuContent': {
		  		templateUrl: 'views/list/list.html',
		  		controller: 'ListCtrl'
			}
	  	}
	});

  /*.state('app.single', {
	url: '/playlists/:playlistId',
	views: {
	  'menuContent': {
		templateUrl: 'views/playlist.html',
		controller: 'PlaylistCtrl'
	  }
	}
  });*/
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
}]);
