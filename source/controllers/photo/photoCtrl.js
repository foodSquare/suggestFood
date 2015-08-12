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