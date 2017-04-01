angular.module('myApp').controller("studentsController", function ($scope, orgService) {
  $scope.init = function () {
    $scope.addStudent = false;
    $scope.student = { name: '', gender: false, city: '' };
    $scope.GetStudents();
  }

  $scope.GetStudents = function () {
    orgService.getAllStudents().then(function (response) {
      $scope.students = response.data;
    });
  }

  $scope.EditStudent = function (item) {
    $scope.student = item;
    $scope.addStudent = true;
  }

  $scope.saveStudent = function () {
    orgService.saveStudent($scope.student).then(function (response) {
      $scope.GetStudents();
      $scope.addStudent = false;
      $scope.student = {};
    });
  }
});