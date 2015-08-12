(function(){
  app.controller('ListCtrl', ['$scope', function($scope) {
    $scope.foodList = [
      { title: 'Meals 1', id: 1 },
      { title: 'Meals 2', id: 2 },
      { title: 'Meals 3', id: 3 },
      { title: 'Meals 4', id: 4 },
      { title: 'Meals 5', id: 5 },
      { title: 'Meals 6', id: 6 }
    ];

  }]);

}());