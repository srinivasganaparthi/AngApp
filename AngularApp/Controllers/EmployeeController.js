angular.module('myApp').controller("employeeController", function ($scope, $http, orgService) {
  $scope.init = function () {
    $scope.searchText = '';
    $scope.SortColumn = "name";
    $scope.SortOrder = true;
    $scope.addEmployee = false;
    $scope.employee = {};
    $scope.getEmployees();

  }
  $scope.SortData = function (colName) {
    $scope.SortOrder = !$scope.SortOrder;
    $scope.SortOrder == true ? colName = "+" + colName : colName = "-" + colName
    $scope.SortColumn = colName;
  };

  $scope.EditEmployee = function (item) {
    $scope.employee = item;
    $scope.addEmployee = true;
  }

  $scope.SaveEmployee = function () {
    orgService.saveEmployee($scope.employee).then(function (response) {
      $scope.getEmployees();
      $scope.addEmployee = false;
      $scope.employee = {}
    });
  }

  $scope.getEmployees = function () {
    orgService.getAllEmplyees().then(function (response) {
      $scope.employees = response.data;
    });
  }

});