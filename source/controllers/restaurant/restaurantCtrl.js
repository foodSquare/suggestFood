(function(){
	app.controller('RestaurantCtrl', ['$scope', '$stateParams','Camera', function($scope, $stateParams, Camera) {

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
