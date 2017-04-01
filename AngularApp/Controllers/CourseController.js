(function () {
  'use strict';
  var injectParams = ['$scope','orgService'];
  function coursesController($scope,orgService) {

    $scope.init = function () {
      $scope.addCourse = false;
      $scope.course = {};
      $scope.getCourses();
    }

    $scope.getCourses = function () {
      orgService.getCourses().then(function (response) {
        $scope.courses = response.data;
      });
    }

    $scope.EditCourse = function (item) {
      $scope.course = item;
      $scope.addCourse = true;
    }

    $scope.SaveCourse = function () {
      orgService.saveCourse($scope.course).then(function (response) {
        $scope.getCourses();
        $scope.addCourse = false;
        $scope.course = {}
      });
    }
  }
  coursesController.$inject = injectParams;
  angular.module('myApp').controller('coursesController', coursesController);
}());