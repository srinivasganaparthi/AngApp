var app = angular.module("myApp", ["ngRoute"]);
app.controller("homeController", function ($scope, $location, orgService, globals) {
  $scope.message = "Welcome";
  $scope.init = function ()
  {
    $scope.password = '';
    $scope.userName = '';
    $location.path('/courses');
    //$scope.isValidUser = globals.getKeyValue('IsLoggedin');
    //if (!$scope.isValidUser) {
    //  $location.path('/login');
    //}
  }

  $scope.validateUser = function () {
   // $scope.isValidUser = true;
    orgService.validateLogin($scope.userName, $scope.password).then(function (response) {
      $scope.isValidUser = response.data;
      if ($scope.isValidUser) {
        globals.setKeyValue('IsLoggedin', true);
        $location.path('/courses');
      }
    });
    //$location.path('/courses');
    //Call service
    //if (!$scope.isValidUser) {
    //   $location.path('/login');
    //}
    //
  }
  
});
app.directive("menuDirective", function () {
  return {
    restrict: 'AEC',
    templateUrl: 'Views/MenuItem.html'
  }
});




