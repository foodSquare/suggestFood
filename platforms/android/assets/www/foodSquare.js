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

	.state('app.challenge', {
	  	url: '/challenge',
	  	views: {
			'menuContent': {
		  		templateUrl: 'views/challenge/challenge.html',
		  		controller: 'ChallengeCtrl'
			}
	  	}
	})

	.state('app.restaurant', {
	  	url: '/restaurant',
	  	views: {
			'menuContent': {
		  		templateUrl: 'views/restaurant/restaurant.html',
		  		controller: 'RestaurantCtrl'
			}
	  	}
	})

	.state('app.picture', {
	  	url: '/picture',
	  	views: {
			'menuContent': {
		  		templateUrl: 'views/pictures/pictures.html',
		  		controller: 'PicturesCtrl'
			}
	  	}
	})

	.state('app.settings', {
	  	url: '/settings',
	  	views: {
			'menuContent': {
		  		templateUrl: 'views/settings/settings.html',
		  		controller: 'SettingsCtrl'
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


(function(){
	app.factory('Camera', ['$q', function($q) {
 
	  return {
	    getPicture: function(options) {
	      var q = $q.defer();
	      
	      navigator.camera.getPicture(function(result) {
	        // Do any magic you need
	        q.resolve(result);
	      }, function(err) {
	        q.reject(err);
	      }, options);
	      
	      return q.promise;
	    }
	  }
	}]);

	
}());

(function(){
	app.controller('ChallengeCtrl', ['$scope', function($scope) {
		console.log("Challenge");
	}]);
}());
(function(){
	app.controller('RestaurantCtrl', ['$scope', function($scope) {
		$scope.foodList = [
	  	{ 
			title: 'Meals 1', 
			id: 1,
			description: 'This is the best restaurant 1'
	   	},
	  	{ 
			title: 'Meals 2', 
			id: 2,
			description: 'This is the best restaurant 2'
	   	},
	   	{ 
			title: 'Meals 3', 
			id: 3,
			description: 'This is the best restaurant 3'
	   	},
	   	{ 
			title: 'Meals 4', 
			id: 4,
			description: 'This is the best restaurant 4'
	   	},
	   	{ 
			title: 'Meals 5', 
			id: 5,
			description: 'This is the best restaurant 5'
	   	},
	   	{ 
			title: 'Meals 6', 
			id: 6,
			description: 'This is the best restaurant 6'
	   	},
	   	{ 
			title: 'Meals 7', 
			id: 7,
			description: 'This is the best restaurant 7'
	   	},
	   	{ 
			title: 'Meals 8', 
			id: 8,
			description: 'This is the best restaurant 8'
	   	},
	];

  }]);

}());
(function(){
	app.controller('PicturesCtrl', ['$scope', function($scope) {
		console.log("Pictures");
	}]);

}());
(function(){
	app.controller('SettingsCtrl', ['$scope', function($scope) {
		console.log("Settings");
	}]);
}());
(function(){
	app.controller('LoginCtrl', ['$scope','$location', '$ionicPopup', 
		function($scope, $location, $ionicPopup){
		 

		$scope.login = {
			messageSuccess: function () {
				var alertPopup = $ionicPopup.alert({
					title: 'Successful login',
					template: 'Welcome @user!',
					cssClass: 'foodsquare-login-successmsg',
					okText: 'Go!'
				});
				alertPopup.then(function(res) {
					$location.path('/app/restaurant');
				});
			},
			checkAuthentication: function () {
				this.messageSuccess();	
				/**
				 * If the authentication is successfull redirect to the main view
				 */

			}
		};
	}]);

}());
(function(){
  app.controller('MenuCtrl', ['$scope', '$ionicModal', '$timeout', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('views/login/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  }]);

}());
(function(){
	
	app.controller('PhotoCtrl', ['$scope', '$stateParams','Camera', function($scope, $stateParams, Camera) {
		
		$scope.getPhoto = function() {
			Camera.getPicture().then(function(imageURI) {
			  console.log(imageURI);
			  $scope.lastPhoto = imageURI;
			}, function(err) {
			  console.err(err);
			}, {
			  quality: 75,
			  targetWidth: 320,
			  targetHeight: 320,
			  saveToPhotoAlbum: false
			});
		};

	}]);

}());
(function(){
	app.controller('SearchCtrl', ['$scope', function($scope){
		console.log('SearchCtrl', $scope);
	}]);

	
}());
