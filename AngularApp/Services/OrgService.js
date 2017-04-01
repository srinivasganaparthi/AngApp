angular.module('myApp').service('orgService', function ($http, $q) {
  this.getAllEmplyees = function () {
    var deferred = $q.defer();
    $http.get("api/Organization/GetAllEmployees").then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  this.getAllStudents = function () {
    var deferred = $q.defer();
    $http.get("api/Organization/GetAllStudents")
                        .then(function (response) {
                          deferred.resolve(response);
                        });
    return deferred.promise;
  }

  this.saveStudent = function (student) {
    var deferred = $q.defer();
    $http.post("api/Organization/SaveStudent", student)
                  .success(function (response) {
                    deferred.resolve(response);
                  }).error(function (error) {
                    //Error Callback
                  });
    return deferred.promise;
  }

  this.saveEmployee = function (employee) {
    var deferred = $q.defer();
    $http.post("api/Organization/SaveEmployee", employee)
                .success(function (response) {
                  deferred.resolve(response);
                }).error(function (error) {
                  //Error Callback
                });
    return deferred.promise;
  }

  this.getCourses = function () {
    var deferred = $q.defer();
    $http.get("api/Organization/GetAllCourses").then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

  this.saveCourse = function (course) {
    var deferred = $q.defer();
    $http.post("api/Organization/SaveCourse", course)
                .success(function (response) {
                  deferred.resolve(response);
                }).error(function (error) {
                  //Error Callback
                });
    return deferred.promise;
  }


  this.validateLogin = function (username,password) {
    var deferred = $q.defer();
    $http.get("api/Organization/ValidateUser?userName='" + username + "'&password='" + password + "'").then(function (response) {
      deferred.resolve(response);
    });
    return deferred.promise;
  }

});

angular.module('myApp').service('userService', function () {
  this.users = ['John', 'James', 'Jake'];
});

angular.module('myApp').factory('userService', function () {
  var fac = {};
  fac.users = ['John', 'James', 'Jake'];
  return fac;

});