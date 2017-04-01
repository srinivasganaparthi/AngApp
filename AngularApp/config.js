angular.module('myApp').config(function ($routeProvider) {
  $routeProvider
      .when("/courses", {
        templateUrl: "Views/Cources.html",
        controller: "coursesController"
      })
      .when("/students", {
        templateUrl: "Views/Students.html",
        controller: "studentsController"
      })
    .when("/employees", {
      templateUrl: "Views/Employees.html",
      controller: "studentsController"
    })
    .when("/fileUpload", {
      templateUrl: "Views/FileUpload.html",
      controller: "fupController"
    })
    .when("/login", {
      templateUrl: "Login.html",
      controller: "homeController"
    })
  .when("AngularApp/", {
    templateUrl: "index.html",
    controller: "homeController"
  })
});