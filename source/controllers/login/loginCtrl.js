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
					$location.path('/app/list');
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